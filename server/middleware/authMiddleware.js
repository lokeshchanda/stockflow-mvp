const jwt = require("jsonwebtoken");
const db = require("../config/db"); // 🔥 FIXED

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await db.query(
      `SELECT
        u.id,
        u.full_name,
        u.email,
        u.organization_id,
        o.organization_name
       FROM users u
       JOIN organizations o ON u.organization_id = o.id
       WHERE u.id = ?`,
      [decoded.id]
    );

    if (!rows.length) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = rows[0];

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Token is invalid",
    });
  }
};

module.exports = protect;