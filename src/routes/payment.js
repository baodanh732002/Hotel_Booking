const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/PaymentController");

// LoginController.index
router.get("/payment", paymentController.paymentPage);
router.post("/payment", paymentController.paymentHandle);

module.exports = router;
