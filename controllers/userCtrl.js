const {
  userModel,
  validateUser,
  validateLogin,
} = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.send({ status: false, message: error.message });
    // const salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const checkUserExists = await userModel.findOne({ email: req.body.email });
    if (checkUserExists)
      return res.send({ status: false, message: "User already exists" });
    new userModel(req.body).save();
    res.send({
      status: true,
      message: "created successfully [" + req.body.username + "]",
    });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.send(user);
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const getByIdUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const { error } = validateUser(req.body);
    if (error) return res.send({ status: false, message: error.message });
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.send({ status: true, message: "Updated user successfully" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.send({ status: false, message: error.message });
    await userModel.findByIdAndDelete(req.params.id);
    res.send({ status: true, message: "delete user successfully" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
const Login = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.send({ status: false, message: error.message });
    const checkUser = await userModel.findOne({ email: req.body.email });
    if (!checkUser)
      return res.send({
        status: false,
        message: "User or password incorrect  found 😁",
      });
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    );
    if (!checkPassword)
      return res.send({
        status: false,
        message: "User or password incorrect  found 😁",
      });

    const token = jwt.sign(
      { id: checkUser._id, email: checkUser.email, name: checkUser.name },
      "lYOXXekJDjkqQ6U7kg9i5s3gaJPm4BLzF8PjK45d3dd60e97e3ee3a9ecomerce",
    );
    // console.log(token);

    res.send({
      status: true,
      message: `successfully Logged as [${checkUser.name}] `,
      token: token,
    });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};
module.exports = {
  createUser,
  Login,
  getUser,
  getByIdUser,
  deleteUser,
  updateUser,
};
