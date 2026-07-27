import { Inventory } from "../models/index.js";

export const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInventoryByProduct = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

export const createInventory = async (req, res) => {
  try {
    const inventory = req.body.inventory;
    const inventoryRecord = await Inventory.create(inventory);
    if (!inventoryRecord) {
      return res.status(404).json({ message: "Unable to create new record" });
    }
    res.status(201).json(inventoryRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInventoryByProductAndVariant = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

export const updateInventoryByProductAndVariant = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

export const deleteInventoryByProductAndVariant = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};
