const mongoose = require("mongoose");
const joi = require("joi");

const orderSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    Qty: Number,
    accountNo: Number,
    price: Number,
    amount: Number,
    TotalAmount: Number,
    status: {
      type: String,
      enum: ["pending", "paid", "completed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);
function validateOrder(body) {
  const order = joi.object({
    productId: joi.string().required(),
    Qty: joi.number().required(),
    accountNo: joi.number().required(),
    paymentMethod: joi.string(),
    amount:joi.number().required(),
  });
  return order.validate(body);
}

module.exports = { orderModel, validateOrder };
