app.get("/seed-user", async (req, res) => {
  try {
    const { pool } = require("./config/db");

    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      ["admin@gmail.com"]
    );

    if (existing.length > 0) {
      return res.json({ message: "User already exists" });
    }

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      ["Admin", "admin@gmail.com", "123456"]
    );

    res.json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});