const { productModel, validateProduct } = require("../models/productModel");
const createProduct = async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.send({ status: false, message: error.message });
    new productModel(req.body).save();
    res.send({ status: true, message: "created product successfully" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await productModel.find().populate({
      path: "Category",
      model: "Category",
      select: "-_id name",
    });
    res.send(product);
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
const getByIdProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.send(product);
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
const getTrendingProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .sort({ createdAt: -1 })
      .limit(4)
      .populate({
        path: "Category",
        model: "Category",
        select: "-_id name",
      });

    res.status(200).send({
      status: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.send({ status: false, message: error.message });
    await productModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({ status: true, message: "Updated successfully" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) return res.send({ status: false, message: error.message });
    await productModel.findByIdAndDelete(req.params.id);
    res.send({ status: true, message: "Deleted  successfully" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getByIdProduct,
  getTrendingProducts,
};
