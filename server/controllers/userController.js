const { pool } = require("../config/db");

// ======================================
// Get Logged-in User Profile
// ======================================
const getProfile = async (req, res) => {
  try {

    const [rows] = await pool.query(
      `SELECT
          u.id,
          u.full_name,
          u.email,
          u.organization_id,
          o.organization_name
       FROM users u
       JOIN organizations o
         ON u.organization_id = o.id
       WHERE u.id = ?`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: rows[0].id,
        name: rows[0].full_name,
        email: rows[0].email,
        organization: rows[0].organization_name,
        organization_id: rows[0].organization_id,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getProfile,
};