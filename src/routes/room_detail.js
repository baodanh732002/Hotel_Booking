const express = require("express");
const router = express.Router();

const roomDetailController = require("../controllers/RoomDetailController");

router.get("/room_detail", roomDetailController.roomDetailPage);
// router.post("/signup", signUpController.createAccount);
module.exports = router;
