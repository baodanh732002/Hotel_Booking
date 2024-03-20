const { name } = require("ejs");
const Room = require("../models/Room");
const User = require("../models/User");
const Service = require("../models/Service");
const Booking = require("../models/Booking");

class AdminController {
  // [GET] /contact
  async roomManagePage(req, res) {
    const roomData = await Room.find();
    res.render("room_management", { roomData });
  }

  async roomAdd(req, res) {
    try {
      let { name_r, noP, price, describe, type, image, status } = req.body;

      const status_bool = true;
      if (status === "Unavailable") {
        status_bool = false;
      }
      const newRoom = new Room({
        name: name_r,
        noP: noP,
        price: price,
        description: describe,
        type: type,
        image: image,
        status: status_bool,
      });

      await newRoom.save();
      res.redirect("/room_management");
    } catch (error) {
      console.error(error);
      res.status(500).render("room_management", {
        message: "Failed to add new room.",
      });
    }
  }

  async roomUpdate(req, res) {
    try {
      const { id, name_r, noP, price, describe, type, image, status } =
        req.body;

      const updates = {
        name: name_r,
        noP,
        price,
        description: describe,
        type,
        image,
        status: status === "Available" ? true : false,
      };

      const room = await Room.findByIdAndUpdate(id, updates);

      if (!room) {
        return res.status(404).send("Room not found");
      }

      res.redirect("/room_management");
    } catch (error) {
      console.error(error);
      res.status(500).render("room_management", {
        message: "Failed to update room.",
      });
    }
  }

  async roomDelete(req, res) {
    try {
      const { id } = req.body;

      await Room.deleteOne({ _id: id });

      res.redirect("/room_management");
    } catch (error) {
      console.error(error);
      res.status(500).render("room_management", {
        message: "Failed to delete room.",
      });
    }
  }

  async userManagePage(req, res) {
    const userData = await User.find();
    res.render("user_management", { userData });
  }

  async userDelete(req, res) {
    try {
      const { id } = req.body;

      await User.deleteOne({ _id: id });

      res.redirect("/user_management");
    } catch (error) {
      console.error(error);
      res.status(500).render("user_management", {
        message: "Failed to delete user.",
      });
    }
  }

  async serviceManagePage(req, res) {
    const serviceData = await Service.find();
    res.render("service_management", { serviceData });
  }

  async serviceAdd(req, res) {
    try {
      const { name_r, acronym, price, type } = req.body; // assuming the service data is sent in the request body

      // Create a new service object
      const newService = new Service({
        name: name_r,
        acronym,
        price,
        type,
      });

      // Save the new service to the database
      await newService.save();

      res.redirect("/service_management");
    } catch (error) {
      console.error(error);
      res.status(500).render("service_management", {
        message: "Failed to add new service.",
      });
    }
  }

  async serviceUpdate(req, res) {
    try {
      const { id, name_r, acronym, price, type } = req.body;

      const updates = {
        name: name_r,
        acronym,
        price,
        type,
      };

      const service = await Service.findByIdAndUpdate(id, updates);

      if (!service) {
        return res.status(404).send("Service not found");
      }

      res.redirect("/service_management");
    } catch (error) {
      console.error(error);
      res.status(500).render("service_management", {
        message: "Failed to update service.",
      });
    }
  }

  async serviceDelete(req, res) {
    try {
      const { id } = req.body;

      await Service.deleteOne({ _id: id });

      res.redirect("/service_management");
    } catch (error) {
      console.error(error);
      res.status(500).render("service_management", {
        message: "Failed to delete service.",
      });
    }
  }

  async bookingManagePage(req, res) {
    const bookingData = await Booking.find();
    res.render("booking_management", { bookingData });
  }

  async bookingDelete(req, res) {
    try {
      const { id } = req.body;

      await Booking.deleteOne({ _id: id });

      res.redirect("/booking_management");
    } catch (error) {
      console.error(error);
      res.status(500).render("booking_management", {
        message: "Failed to delete booking.",
      });
    }
  }
}

module.exports = new AdminController();
