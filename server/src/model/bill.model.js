const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: true,
    },
    customer_phone: {
      type: String,
    },
    customer_email: {
      type: String,
    },
    customer_address: {
      type: String,
      required: true,
    },

    // FIXED PRODUCTS SCHEMA
    products: [
      {
        product_name: {
          type: String,
          required: true,
        },
        product_price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },

        // 👇👇 ADD THIS
        subtotal: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],

    total_amount: {
      type: Number,
      required: true,
      default: 0,
    },

    payment: {
      status: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending",
      },
      provider: String,
      paidAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bill", billSchema);
