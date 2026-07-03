const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    organization: {
      type: Number, // 🔥 IMPORTANT FIX (MUST MATCH LOGIN)
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

