const { render } = require("ejs");
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const User = require("../models/User");

class HistoryBookingController {
  async index(req, res) {
    const user = req.session.user || null;
    if (user) {
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
        user,
        header: "header",
        bookingData,
        roomData,
        formattedBookingData,
      });
    } else {
      const bookingData = null;
      const roomData = null;
      const formattedCheckInDate = null;
      const formattedCheckOutDate = null;
      res.render("history_booking_user", {
        user,
        header: "header",
        bookingData,
        roomData,
        formattedCheckInDate,
        formattedCheckOutDate,
      });
    }
  }

  async afterPay(req, res) {
    const user = req.session.user || null;
    if (user) {
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
        user,
        header: "header",
        bookingData,
        roomData,
        formattedBookingData,
      });
    } else {
      let phone = req.body.phone;
      let bookingData = await Booking.findOne({ phone: phone });
      let roomData = null;
      if (!bookingData) {
        bookingData = null;
        roomData = null;
        const formattedCheckInDate = null;
        const formattedCheckOutDate = null;
        res.render("history_booking_user", {
          user,
          header: "header",
          bookingData,
          roomData,
          formattedCheckInDate,
          formattedCheckOutDate,
        });
      } else {
        const formattedCheckInDate = bookingData.checkInDate.toLocaleDateString(
          "en-GB",
          { day: "2-digit", month: "short", year: "numeric" }
        );
        const formattedCheckOutDate =
          bookingData.checkOutDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        roomData = await Room.findOne({ _id: bookingData.room });
        res.render("history_booking_user", {
          user,
          header: "header",
          bookingData,
          roomData,
          formattedCheckInDate,
          formattedCheckOutDate,
        });
      }
    }
  }

  async searchBooking(req, res) {
    const phone_number_pay = req.body.phone;
    let bookingData = await Booking.findOne({ phone: phone_number_pay });
    let roomData = null;
    const user = req.session.user || null;

    if (!bookingData) {
      bookingData = null;
      roomData = null;
      const formattedCheckInDate = null;
      const formattedCheckOutDate = null;
      res.render("history_booking_user", {
        user,
        header: "header",
        bookingData,
        roomData,
        formattedCheckInDate,
        formattedCheckOutDate,
        phone_number_pay,
      });
      return;
    }

    roomData = await Room.findOne({ _id: bookingData.room });
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
      formattedCheckInDate,
      formattedCheckOutDate,
      phone_number_pay,
    });
  }
}

module.exports = new HistoryBookingController();
