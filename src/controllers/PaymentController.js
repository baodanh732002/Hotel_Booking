const Service = require("../models/Service");
const User = require("../models/User");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const { render } = require("ejs");

class PaymentController {
  async paymentPage(req, res) {
    res.render("payment");
  }

  async paymentHandle(req, res) {
    const user = req.session.user || null;
    if (user) {
      const {
        email_pay,
        roomId,
        roomType,
        checkIn,
        checkOut,
        roomPrice,
        servicePrice,
        services,
        credit_pay,
        total,
      } = req.body;

      let phone_number_pay = "";
      if ("phone_number_pay" in req.body) {
        phone_number_pay = req.body.phone_number_pay;
      } else {
        const userData = await User.findOne({ email: email_pay });
        phone_number_pay = userData.phone;
      }

      // Create a new booking instance using the Booking model
      const newBooking = new Booking({
        user: email_pay,
        phone: phone_number_pay,
        room: roomId,
        type: roomType,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        roomPrice,
        servicePrice,
        services,
        credit: credit_pay,
        total,
      });

      // Save the new booking instance to the database
      await newBooking.save();
      await Room.updateOne({ _id: roomId }, { $set: { status: false } });

      const bookingData = await Booking.find({ user: user.email });
      const roomIds = bookingData.map((booking) => booking.room);
      const roomData = await Room.find({ _id: { $in: roomIds } });

      const formattedBookingData = bookingData.map((booking) => {
        const formattedCheckInDate = booking.checkInDate.toLocaleDateString(
          "en-GB",
          { day: "2-digit", month: "short", year: "numeric" }
        );
        const formattedCheckOutDate = booking.checkOutDate.toLocaleDateString(
          "en-GB",
          { day: "2-digit", month: "short", year: "numeric" }
        );

        return {
          formattedCheckInDate,
          formattedCheckOutDate,
        };
      });

      res.render("history_booking_user", {
        bookingId: newBooking._id,
        user,
        header: "header",
        bookingData,
        roomData,
        formattedBookingData,
        phone_number_pay,
      });
    } else {
      const {
        email_pay,
        roomId,
        roomType,
        checkIn,
        checkOut,
        roomPrice,
        servicePrice,
        services,
        credit_pay,
        total,
      } = req.body;

      let phone_number_pay = "";
      if ("phone_number_pay" in req.body) {
        phone_number_pay = req.body.phone_number_pay;
      }
      const newBooking = new Booking({
        user: email_pay,
        phone: phone_number_pay,
        room: roomId,
        type: roomType,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        roomPrice,
        servicePrice,
        services,
        credit: credit_pay,
        total,
      });

      // Save the new booking instance to the database
      await newBooking.save();
      await Room.updateOne({ _id: roomId }, { $set: { status: false } });
      const bookingData = await Booking.findOne({ _id: newBooking.id });
      const roomData = await Room.findOne({ _id: bookingData.room });
      const formattedCheckInDate = bookingData.checkInDate.toLocaleDateString(
        "en-GB",
        { day: "2-digit", month: "short", year: "numeric" }
      );
      const formattedCheckOutDate = bookingData.checkOutDate.toLocaleDateString(
        "en-GB",
        { day: "2-digit", month: "short", year: "numeric" }
      );
      res.render("history_booking_user", {
        user,
        header: "header",
        bookingData,
        roomData,
        bookingId: newBooking._id,
        formattedCheckInDate,
        formattedCheckOutDate,
        phone_number_pay,
      });
    }
  }
}

module.exports = new PaymentController();
