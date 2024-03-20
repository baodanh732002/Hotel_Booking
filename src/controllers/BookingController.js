const Room = require("../models/Room");

class BookingController {
  // [GET] /booking
  async index(req, res) {
    const user = req.session.user || null;
    const { checkIn, checkOut, type } = req.query;
    const roomType = await Room.find({ type });

    if (!checkIn || !checkOut || !type) {
      // If any of the parameters is missing, redirect back to the booking page
      return res.render("booking", {
        user,
        header: "header",
        checkIn,
        checkOut,
        type,
        roomType,
      });
    }

    // If all the parameters are present, find the rooms and pass them to the view

    res.render("booking", {
      user,
      header: "header",
      checkIn,
      checkOut,
      type,
      roomType,
    });
  }
}

module.exports = new BookingController();
