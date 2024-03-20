const express = require("express");
const router = express.Router();

const siteController = require("../controllers/SiteController");

// siteControllers.index
router.get("/", siteController.index);
router.post("/", siteController.bookRoom);

module.exports = router;
