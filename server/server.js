const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const { pool } = require("./config/db");

// HOME TEST
app.get("/", (req, res) => {
  res.json({ success: true, message: "API Working" });
});

// SEED USER (TEST ROUTE)
app.get("/seed-user", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ success: true, message: "DB Connected Working", rows });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
app.get("/test-route", (req, res) => {
  res.json({ success: true, message: "TEST ROUTE WORKING" });
});