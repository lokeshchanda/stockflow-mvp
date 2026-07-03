console.log("🔥 DASHBOARD CONTROLLER CALLED");
const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const organizationId = req.user.organization_id;

    const [products] = await db.execute(
      "SELECT * FROM products WHERE organization_id = ?",
      [organizationId]
    );

    console.log("PRODUCTS:", products);

    const totalProducts = products.length;

    // 🔥 FIXED FIELD NAME
    const totalQuantity = products.reduce(
      (sum, p) => sum + Number(p.quantity_in_hand || 0),
      0
    );

    // 🔥 FIXED FIELD NAME
    const inventoryValue = products.reduce(
      (sum, p) =>
        sum +
        Number(p.quantity_in_hand || 0) *
          Number(p.selling_price || 0),
      0
    );

    const lowStockProducts = products.filter(
      (p) =>
        Number(p.quantity_in_hand || 0) <=
        Number(p.low_stock_threshold || 5)
    ).length;

    res.json({
      success: true,
      dashboard: {
        totalProducts,
        totalQuantity,
        inventoryValue,
        lowStockProducts,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { getDashboardStats };