const mongoose = require("mongoose");
const joi = require("joi");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
      enum: ["admin", "user"],
    },
  },
  { timestamps: true },
);
const userModel = mongoose.model("Users", userSchema);

function validateUser(body) {
  const product = joi.object({
    name: joi.string().required(),
    username: joi.string().required(),
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().required(),
    role: joi.string(),
  });
  return product.validate(body);
}
function validateLogin(body) {
  const product = joi.object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi.string().required(),
  });
  return product.validate(body);
}
module.exports = { userModel, validateUser, validateLogin };
