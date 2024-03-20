const express = require("express");
const router = express.Router();

const loginController = require("../controllers/LoginController");
const auth = require("../middleware/auth");

// LoginController.index
router.get("/login", auth.isLogout, loginController.loginForm);
router.post("/login", loginController.checkAccount);

module.exports = router;
