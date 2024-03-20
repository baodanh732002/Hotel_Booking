const express = require("express");
const router = express.Router();

const signUpController = require("../controllers/SignUpController");

// signUpController.index
router.get("/signup", signUpController.signupForm);
router.post("/signup", signUpController.createAccount);
module.exports = router;
