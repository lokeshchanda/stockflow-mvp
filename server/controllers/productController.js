const Product = require("../models/Product");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      sku,
      category,
      quantity,
      price,
      lowStockThreshold,
      description,
    } = req.body;

    if (!productName || !sku) {
      return res.status(400).json({
        success: false,
        message: "Product Name and SKU required",
      });
    }

    const product = await Product.create({
      organization: req.user.organization_id, // 🔥 FIX HERE
      productName,
      sku,
      category,
      quantity,
      price,
      lowStockThreshold,
      description,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      organization: req.user.organization_id, // 🔥 FIX HERE
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
};