import { Pricing, SizeModifier } from "../models/index.js";

export const getAllPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find();
    res.status(200).json(pricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPricingByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const pricing = await Pricing.findOne({ product: productId });
    if (!pricing) {
      return res
        .status(404)
        .json({ message: `No pricing record for ${productId} found` });
    }
    res.status(200).json(pricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPricing = async (req, res) => {
  try {
    const productId = req.params.productId;
    const basePrice = req.body.basePrice;
    const pricing = await Pricing.create({ product: productId, basePrice });
    if (!pricing) {
      return res
        .status(400)
        .json({ message: `Failed to create pricing for ${productId}` });
    }
    res.status(201).json(pricing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePricingByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const basePrice = req.body.basePrice;
    const result = await Pricing.findOneAndUpdate(
      { product: productId },
      { basePrice },
      { new: true },
    );
    if (!result) {
      return res
        .status(400)
        .json({ message: `Couldn't update pricing for ${productId}` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePricingByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await Pricing.findOneAndDelete({ product: productId });
    if (!result) {
      return res
        .status(400)
        .json({ message: `Couldn't delete pricing for ${productId}` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSizeModifiers = async (req, res) => {
  try {
    const modifiers = await SizeModifier.find();
    res.status(200).json(modifiers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSizeModifierBySize = async (req, res) => {
  try {
    const size = req.params.size;
    const modifier = await SizeModifier.findOne({ size });
    if (!modifier) {
      return res
        .status(404)
        .json({ message: `No size modifier record found for ${size}` });
    }
    res.status(200).json(modifier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSizeModifier = async (req, res) => {
  try {
    const { size, modifier } = req.body;
    const newModifier = await SizeModifier.create({ size, modifier });
    if (!newModifier) {
      return res
        .status(404)
        .json({ message: `Couldn't create size modifier record for ${size}` });
    }
    res.status(201).json(newModifier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSizeModifierBySize = async (req, res) => {
  try {
    const size = req.params.size;
    const modifier = req.body.modifier;
    const result = await SizeModifier.findOneAndUpdate(
      { size },
      { modifier },
      {
        new: true,
      },
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: `Couldn't update size modifier record for ${size}` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSizeModifierBySize = async (req, res) => {
  try {
    const size = req.params.size;
    const result = await SizeModifier.findOneAndDelete({ size });
    if (!result) {
      return res
        .status(404)
        .json({ message: `Couldn't delete size modifier record for ${size}` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
