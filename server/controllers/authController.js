const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

// ============================
// REGISTER USER
// ============================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    res.json({
      message: "User registered successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ============================
// LOGIN USER
// ============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = rows[0];

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};