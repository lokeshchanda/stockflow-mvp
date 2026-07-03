const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool(process.env.DB_URL);

const connectDB = async () => {
  try {
    await pool.getConnection();
    console.log("MySQL Connected");
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
  }
};

module.exports = { pool, connectDB };