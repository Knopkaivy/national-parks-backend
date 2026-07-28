import { Inventory } from "../models/index.js";

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
    const { product, variant, count } = req.body;
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
