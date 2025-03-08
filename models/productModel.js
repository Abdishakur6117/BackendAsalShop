const mongoose = require("mongoose");
const joi = require("joi");

const productSchema = mongoose.Schema(
  {
    Pname: String,
    Price: Number,
    Category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true },
);

const productModel = mongoose.model("products", productSchema);
function validateProduct(body) {
  const product = joi.object({
    Pname: joi.string().required(),
    Price: joi.number().required(),
    Category: joi.string().required(),
  });
  return product.validate(body);
}

module.exports = { productModel, validateProduct };
