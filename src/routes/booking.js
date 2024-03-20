const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/BookingController");

// bookingControllers.index
router.get("/booking", bookingController.index);
// router.post("/booking", bookingController.bookRoom);

module.exports = router;
