const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getByIdProduct,
  getTrendingProducts,
} = require("../controllers/productctrl");
const { auth } = require("../midddleware/auth");

router.post("/",auth(["admin"]), createProduct);
router.get("/", getProduct);
router.get("/trending", getTrendingProducts);
router.get("/:id", getByIdProduct);
router.put("/:id", auth(["admin"]), updateProduct);
router.delete("/:id", auth(["admin"]), deleteProduct);

module.exports = router;
