import mongoose from "mongoose";
import { Inventory, Product } from "../models/index.js";

export const getAllInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

export const getInventoryByProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const inventory = await Inventory.find({ product: productId });
    if (!inventory) {
      return res
        .status(404)
        .json({ message: `No ${productId} inventory records found` });
    }
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

export const createInventory = async (req, res, next) => {
  try {
    const { product, size, finish, count } = req.body;
    if (!product || !mongoose.Types.ObjectId.isValid(product)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const variant = `${size}-${finish}`;
    const productRecord = await Product.findOne({ _id: product });
    if (!productRecord) {
      return res.status(404).json({
        message: `Not found product ${product}`,
      });
    }
    if (
      !productRecord.sizes.includes(size) ||
      !productRecord.finishes.includes(finish)
    ) {
      return res.status(404).json({
        message: `${variant} variant is not available for product ${productRecord._id}`,
      });
    }
    const inventoryRecord = await Inventory.create({ product, variant, count });
    if (!inventoryRecord) {
      return res.status(404).json({ message: "Unable to create new record" });
    }
    res.status(201).json(inventoryRecord);
  } catch (error) {
    next(error);
  }
};

export const getInventoryByProductAndVariant = async (req, res, next) => {
  try {
    const { productId, variant } = req.params;
    const inventory = await Inventory.find({ product: productId, variant });
    if (!inventory) {
      return res.status(404).json({
        message: `No ${productId} ${variant} inventory records found`,
      });
    }
    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

export const updateInventoryByProductAndVariant = async (req, res, next) => {
  try {
    const { productId, variant } = req.params;
    const { quantity } = req.body;
    const result = await Inventory.findOneAndUpdate(
      { product: productId, variant },
      { count: quantity },
      { new: true },
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: `Unable to update ${productId} ${variant}` });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteInventoryByProductAndVariant = async (req, res, next) => {
  try {
    const { productId, variant } = req.params;
    const result = await Inventory.findOneAndDelete({
      product: productId,
      variant,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: `Unable to delete ${productId} ${variant}` });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
