const express = require("express");
const router = express.Router();
const {
  createcategory,
  getProduct,
  updateCategory,
  deleteCategory,
  getByIdProduct,
} = require("../controllers/categoryctrl");
const { auth } = require("../midddleware/auth");

router.post("/", auth(["admin"]), createcategory);
router.get("/", getProduct);
router.get("/:id", auth(["admin"]), getByIdProduct);
router.put("/:id", auth(["admin"]), updateCategory);
router.delete("/:id", auth(["admin"]), deleteCategory);

module.exports = router;
