const User = require("../models/User");
const { name } = require("ejs");
const bcrypt = require("bcrypt");

class UserInfoController {
  // [GET] /contact
  async userInfoPage(req, res) {
    const user = req.session.user || null;
    const userId = req.query.id;
    let message = req.query.message;
    if (message) {
      const userData = await User.findOne({ _id: userId });
      console.log(userData);
      res.render("user_info", { user, header: "header", userData, message });
    } else {
      message = null;
      const userData = await User.findOne({ _id: userId });
      console.log(userData);
      res.render("user_info", { user, header: "header", userData, message });
    }
  }

  async updateUserInfo(req, res) {
    try {
      const { id, name, email, phone, address } = req.body;
      console.log(req.body.id);
      const info_updates = {
        name: name,
        email: email,
        phone: phone,
        address: address,
      };

      const userInfo = await User.findByIdAndUpdate(id, info_updates);

      if (!userInfo) {
        return res.status(404).send("User information not found");
      }

      res.redirect("/logout");
    } catch (error) {
      console.log(error.message);
      res.status(500).render("user_info", {
        message: "Failed to update User information.",
      });
    }
  }

  async updatePassword(req, res) {
    try {
      const { id, oldPassword, newPassword } = req.body;
      const userData = await User.findOne({ _id: id });
      console.log(oldPassword);
      // Compare oldPassword with the hashed password stored in the database
      const isMatch = await bcrypt.compare(oldPassword, userData.password);

      if (isMatch) {
        // If the old password is correct, hash and update the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        userData.password = hashedNewPassword;
        await userData.save();
        res.redirect("/logout");
      } else {
        const message = "The old password are not correct!";
        res.redirect(`/user_info?id=${id}&message=${message}`);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).render("change_password", {
        message: "Failed to update password.",
      });
    }
  }
}

module.exports = new UserInfoController();
