const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { pool } = require("../config/db");

// ===============================
// Register
// ===============================
const registerUser = async (req, res) => {
  try {
    const { organization, name, email, password } = req.body;

    if (!organization || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if email exists
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create organization
    const [orgResult] = await pool.query(
      "INSERT INTO organizations (organization_name) VALUES (?)",
      [organization]
    );

    const organizationId = orgResult.insertId;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [userResult] = await pool.query(
      `INSERT INTO users
      (organization_id, full_name, email, password)
      VALUES (?, ?, ?, ?)`,
      [organizationId, name, email, hashedPassword]
    );

    const token = generateToken(userResult.insertId);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: userResult.insertId,
        organization_id: organizationId,
        organization,
        name,
        email,
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Login
// ===============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      `SELECT
          u.id,
          u.full_name,
          u.email,
          u.password,
          u.organization_id,
          o.organization_name
       FROM users u
       JOIN organizations o
         ON u.organization_id=o.id
       WHERE u.email=?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.id);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        organization: user.organization_name,
        organization_id: user.organization_id,
      },
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};