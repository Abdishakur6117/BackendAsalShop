const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getByIdOrder,
  getOrderByUser,
} = require("../controllers/orderCtrl");
const { auth } = require("../midddleware/auth");

router.post("/", auth(["admin"]), createOrder);
router.get("/", getOrder);
router.get("/ByLoggedInUser", auth(["admin","user"]), getOrderByUser);
router.get("/:id", auth(["admin"]), getByIdOrder);
router.put("/:id", auth(["admin"]), updateOrder);
router.delete("/:id", auth(["admin"]), deleteOrder);

module.exports = router;
