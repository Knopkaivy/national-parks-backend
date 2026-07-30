import { Pricing, Product, SizeModifier } from "../models/index.js";

export const getProducts = async (req, res, next) => {
  try {
    const { park, style } = req.query;
    const filter = { ...(park && { park }), ...(style && { style }) };
    const products = await Product.find(filter);
    const productIds = products.map((product) => product._id);
    const pricingRecords = await Pricing.find({ product: { $in: productIds } });
    const pricingMap = {};
    pricingRecords.forEach((record) => {
      pricingMap[record.product.toString()] = record.basePrice;
    });
    const productsWithPricing = products.map((product) => ({
      ...product.toObject(),
      basePrice: pricingMap[product._id.toString()] ?? null,
    }));
    res.status(200).json(productsWithPricing);
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const [pricing, sizeModifiers] = await Promise.all([
      Pricing.findOne({ product: product._id }),
      SizeModifier.find(),
    ]);

    const sizePricing = sizeModifiers
      .filter((modifier) => product.sizes.includes(modifier.size))
      .map((modifier) => ({
        size: modifier.size,
        price: pricing
          ? +(pricing.basePrice + modifier.modifier).toFixed(2)
          : null,
      }));
    res.status(200).json({
      ...product.toObject(),
      basePrice: pricing?.basePrice ?? null,
      sizePricing,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const response = await Product.create(product);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const slug = req.params.slug;
    const response = await Product.findOneAndUpdate({ slug }, product, {
      new: true,
    });
    if (!response) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const response = await Product.findOneAndDelete({ slug });
    if (!response) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
