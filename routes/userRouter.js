const express = require("express");
const {
  createUser,
  Login,
  getUser,
  getByIdUser,
  updateUser,
  deleteUser,
} = require("../controllers/userCtrl");
const { auth } = require("../midddleware/auth");
const router = express.Router();

router.post("/", createUser);
router.post("/login", Login);
router.get("/", auth(["admin",]), getUser);
router.get("/:id", auth(["admin"]), getByIdUser);
router.put("/:id", auth(["admin"]), updateUser);
router.delete("/:id", auth(["admin"]), deleteUser);


module.exports = router;
