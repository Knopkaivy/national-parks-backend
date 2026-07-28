import {
  Inventory,
  User,
  Product,
  Order,
  Pricing,
  SizeModifier,
} from "../models/index.js";
import { InsufficientStockError, PriceMismatchError } from "../utils/errors.js";

const FREE_SHIPPING_THRESHOLD = 75;
const STANDART_SHIPPING_COST = 6.99;

const checkInventory = async (items) => {
  await Promise.all(
    items.map(async (item) => {
      const { productId, variant, quantity } = item;
      const inventory = await Inventory.findOne({
        product: productId,
        variant,
      });

      if (!inventory) {
        throw new Error(`Inventory record not found for ${variant}`);
      }

      if (inventory.count < quantity) {
        throw new InsufficientStockError(variant);
      }
    }),
  );
};

const decrementInventory = async (items) => {
  await Promise.all(
    items.map(async (item) => {
      const { productId, variant, quantity } = item;
      await Inventory.findOneAndUpdate(
        { product: productId, variant },
        { $inc: { count: -quantity } },
        { new: true },
      );
    }),
  );
};

const createOrderDocument = async (
  items,
  shippingAddress,
  userId,
  expectedTotal,
) => {
  const orderItems = await Promise.all(
    items.map(async (item) => {
      const { productId, size, finish, quantity } = item;
      const product = await Product.findById(productId);
      const pricing = await Pricing.findOne({ product: productId });
      if (!pricing) {
        throw new Error(`No pricing found for product ${productId}`);
      }
      const basePrice = pricing.basePrice;
      const sizeModifier = await SizeModifier.findOne({ size });
      if (!sizeModifier) {
        throw new Error(`No size modifier found for size ${size}`);
      }
      const itemTotal = +(
        (basePrice + sizeModifier.modifier) *
        quantity
      ).toFixed(2);
      const snapshot = {
        productId,
        productName: product.name,
        slug: product.slug,
        size,
        finish,
        quantity,
        pricePaid: itemTotal,
      };
      return { ...snapshot, itemTotal };
    }),
  );
  const subtotal = orderItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const shippingCost =
    subtotal < FREE_SHIPPING_THRESHOLD ? STANDART_SHIPPING_COST : 0;
  const calculatedTotal = +(subtotal + shippingCost).toFixed(2);
  if (Math.abs(calculatedTotal - expectedTotal) > 0.01) {
    throw new PriceMismatchError();
  }
  const orderDocument = {
    orderItems,
    shippingAddress,
    user: userId,
    totalPrice: subtotal,
    shippingCost,
    totalWithShipping: calculatedTotal,
  };
  return orderDocument;
};

export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, totalWithShipping } = req.body;
    const userId = req.user.userId;
    await checkInventory(items);
    const orderDocument = await createOrderDocument(
      items,
      shippingAddress,
      userId,
      totalWithShipping,
    );
    const result = await Order.create(orderDocument);
    if (!result) {
      return res.status(400).json({ message: "Unable to complete order." });
    }
    try {
      await decrementInventory(items);
    } catch (error) {
      console.error(`INVENTORY_SYNC_FAILED: Order ${result._id}`, erro.message);
    }
    res.status(201).json(orderDocument);
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(400).json({ message: "No such order" });
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.userId });
    if (!orders) {
      return res.status(400).json({ message: "No orders available" });
    }
    if (!req.user.isAdmin && order.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(400).json({ message: "No orders available" });
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const result = await Order.findByIdAndUpdate(
      orderId,
      {
        status: req.body.status,
      },
      { new: true },
    );
    if (!result) {
      return res
        .status(400)
        .json({ message: `Unable to update order ${orderId} status` });
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const result = await Order.findByIdAndDelete(orderId);
    if (!result) {
      return res
        .status(400)
        .json({ message: `Unable to delete order ${orderId}` });
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
