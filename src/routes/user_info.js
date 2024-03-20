const express = require("express");
const router = express.Router();

const userInfoController = require("../controllers/UserInfoController");
const auth = require("../middleware/auth");

router.get("/user_info", auth.isLogin, userInfoController.userInfoPage);
router.post("/user_info_update", userInfoController.updateUserInfo);
router.post("/user_info/change_password", userInfoController.updatePassword);

module.exports = router;
