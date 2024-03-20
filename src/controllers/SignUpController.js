const User = require("../models/User");
const bcrypt = require("bcrypt");

class SignUpController {
  // Render signup form
  // async index(req, res) {
  //   res.render("signup");
  // }

  signupForm(req, res) {
    res.render("signup");
  }

  // Handle form submission
  async createAccount(req, res) {
    try {
      let { fullname, email, address, phone, password, confirm_pass } =
        req.body;

      let regEmail =
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      let regPhone = /^[0-9]*$/;
      // Validate form data
      if (
        !fullname ||
        !email ||
        !address ||
        !phone ||
        !password ||
        !confirm_pass
      ) {
        return res.render("signup", {
          message: "Please fill in all required fields.",
        });
      }

      if (regEmail.test(email) == false) {
        return res.render("signup", {
          message: "Invalid Email Address.",
        });
      }

      if (regPhone.test(phone) == false) {
        return res.render("signup", {
          message: "Invalid Phone.",
        });
      }

      if (password !== confirm_pass) {
        return res.render("signup", {
          message: "Password and Confirm Password do not match.",
        });
      }

      // Check if email already exists in database
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.render("signup", { message: "Email already registered." });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        name: fullname,
        email: email,
        password: hashedPassword,
        phone: phone,
        address: address,
      });

      await newUser.save();
      res.redirect("/login?success=true");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .render("signup", { message: "Failed to create account." });
    }
  }
}

module.exports = new SignUpController();
