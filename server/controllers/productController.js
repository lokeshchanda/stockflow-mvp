const { pool } = require("../config/db");

// GET ALL
const getProducts = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM products");
  res.json(rows);
};

// ADD
const addProduct = async (req, res) => {
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

  res.json({ message: "Product added" });
};

// UPDATE (IMPORTANT FIX)
const updateProduct = async (req, res) => {
  const { id } = req.params;

  await pool.query("UPDATE products SET ? WHERE id = ?", [
    req.body,
    id,
  ]);

  res.json({ message: "Updated" });
};

// DELETE
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM products WHERE id = ?", [id]);

  res.json({ message: "Deleted" });
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};