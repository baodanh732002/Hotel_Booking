const express = require("express");
const router = express.Router();

const historyBookingController = require("../controllers/HistoryBookingController");

// router.use("/history_booking_user", historyBookingController.index);
router.get("/history_booking_user", historyBookingController.index);
router.post("/history_booking_user", historyBookingController.afterPay);
router.post("/history_booking", historyBookingController.searchBooking);
router.get("/history_booking", historyBookingController.searchBooking);

module.exports = router;
