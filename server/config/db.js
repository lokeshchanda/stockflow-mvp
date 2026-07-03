const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectDB = async () => {
  try {
    await pool.getConnection();
    console.log("MySQL Connected");
  } catch (err) {
    console.error("DB Connection Failed", err);
  }
};

module.exports = { pool, connectDB };