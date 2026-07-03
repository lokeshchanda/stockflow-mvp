const { pool } = require("../config/db");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      sku,
      description,
      quantity_in_hand,
      cost_price,
      selling_price,
      low_stock_threshold,
    } = req.body;

    await pool.query(
      `INSERT INTO products 
      (product_name, sku, description, quantity_in_hand, cost_price, selling_price, low_stock_threshold)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        product_name,
        sku,
        description,
        quantity_in_hand,
        cost_price,
        selling_price,
        low_stock_threshold,
      ]
    );

    res.json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
};