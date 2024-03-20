const express = require("express");
const router = express.Router();

const aboutController = require("../controllers/AboutController");

// aboutControllers.index
router.use("/", aboutController.index);

module.exports = router;
