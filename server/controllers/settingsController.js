const bcrypt = require("bcryptjs");
const { pool } = require("../config/db");

// ==========================================
// Get Settings
// ==========================================
const getSettings = async (req, res) => {
  try {

    const [rows] = await pool.query(
      `SELECT
        id,
        full_name,
        email,
        organization_id
      FROM users
      WHERE id=?`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: rows[0],
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ==========================================
// Update Settings
// ==========================================
const updateSettings = async (req, res) => {
  try {

    const { name, password } = req.body;

    if (name) {
      await pool.query(
        `UPDATE users
         SET full_name=?
         WHERE id=?`,
        [name, req.user.id]
      );
    }

    if (password && password.trim() !== "") {

      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        `UPDATE users
         SET password=?
         WHERE id=?`,
        [hashedPassword, req.user.id]
      );
    }

    res.json({
      success: true,
      message: "Settings updated successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  getSettings,
  updateSettings,
};