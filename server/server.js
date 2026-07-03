const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// DATABASE
// ======================
const { pool } = require("./config/db");

// ======================
// HEALTH CHECK ROUTE
// ======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 StockFlow API Running Successfully",
  });
});

// ======================
// TEST DB ROUTE
// ======================
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({
      success: true,
      message: "DB Connected Successfully",
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ======================
// SEED USER ROUTE (LOGIN TEST)
// ======================
app.get("/seed-user", async (req, res) => {
  try {
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      ["admin@gmail.com"]
    );

    if (existing.length > 0) {
      return res.json({
        success: true,
        message: "User already exists",
      });
    }

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      ["Admin", "admin@gmail.com", "123456"]
    );

    res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});