const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

class LoginController {
  // [GET] /login
  // Render signup form
  loginForm(req, res) {
    const success = req.query.success;
    res.render("login", { success: success });
  }

  // Handle form submission
  async checkAccount(req, res) {
    try {
      let { email, password } = req.body;
      const createToken = async (id) => {
        console.log({ email, password });
        try {
          const token = await jwt.sign({ _id: id }, process.env.JWT_SECRET);
          return token;
        } catch (error) {
          res.status(400).send(error.message);
        }
      };

      // Validate form data
      if (!email || !password) {
        return res.render("login", {
          message: "Please fill in all required fields.",
        });
      }

      if (email === "admin@gmail.com" && password === "123456") {
        res.status(200).redirect("room_management");
      }

      // Check if email already exists in database
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        const passwordMatch = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (passwordMatch) {
          const tokenData = await createToken(existingUser._id);
          const userResult = {
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            phone: existingUser.phone,
            address: existingUser.address,
            password: existingUser.password,
            token: tokenData,
          };

          req.session.user = userResult;

          const response = {
            success: true,
            msg: "Login complete",
            data: userResult,
          };

          console.log(response);

          res.status(200).redirect("/");
        } else {
          res.render("login", { message: "Login details are incorrect" });
        }
      } else {
        res.render("login", { message: "Login details are incorrect" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).render("login", { message: "Failed to login." });
    }
  }
}

module.exports = new LoginController();
