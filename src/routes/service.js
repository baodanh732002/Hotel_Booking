const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/ServiceController");

// LoginController.index
router.get("/service", serviceController.servicePage);
router.post("/service", serviceController.serviceHandle);

module.exports = router;
