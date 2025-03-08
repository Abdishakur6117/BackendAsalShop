const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true },
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = { categoryModel };
