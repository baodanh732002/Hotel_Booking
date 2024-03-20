const express = require("express");
const router = express.Router();

const contactController = require("../controllers/ContactController");

// contactControllers.index
router.use("/", contactController.index);

module.exports = router;
