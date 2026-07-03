app.get("/seed-user", async (req, res) => {
  try {
    const { pool } = require("./config/db");

    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      ["admin@gmail.com"]
    );

    if (existing.length > 0) {
      return res.json({ success: true, message: "User already exists" });
    }

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      ["Admin", "admin@gmail.com", "123456"]
    );

    res.json({ success: true, message: "User created" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});