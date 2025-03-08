const { categoryModel } = require("../models/categoryModel");

//insert category
const createcategory = (req, res) => {
  try {
    new categoryModel(req.body).save();
    res.send({ status: true, message: "created category successfully" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
//read all data
const getProduct = async (req, res) => {
  try {
    const category = await categoryModel.find();
    res.send(category);
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
//read  data BYId
const getByIdProduct = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    res.send(category);
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
//update data for category
const updateCategory = async (req, res) => {
  try {
    await categoryModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({ status: true, message: "Updated successfully" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
//delete data
const deleteCategory = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);
    res.send({ status: true, message: "Category deleted successfully" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
module.exports = {
  createcategory,
  getProduct,
  updateCategory,
  deleteCategory,
  getByIdProduct,
};
