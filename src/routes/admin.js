const express = require("express");
const router = express.Router();

const adminController = require("../controllers/AdminController");

// LoginController.index
router.get("/room_management", adminController.roomManagePage);
router.post("/room_management_add", adminController.roomAdd);
router.post("/room_management_update", adminController.roomUpdate);
router.post("/room_management_delete", adminController.roomDelete);

router.get("/user_management", adminController.userManagePage);
router.post("/user_management_delete", adminController.userDelete);

router.get("/service_management", adminController.serviceManagePage);
router.post("/service_management_add", adminController.serviceAdd);
router.post("/service_management_update", adminController.serviceUpdate);
router.post("/service_management_delete", adminController.serviceDelete);

router.get("/booking_management", adminController.bookingManagePage);
router.post("/booking_management_delete", adminController.bookingDelete);

module.exports = router;
