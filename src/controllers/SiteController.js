const User = require("../models/User");
const Room = require("../models/Room");

class SiteController {
  // [GET] /
  async index(req, res) {
    const user = req.session.user || null;

    const roomBasic = await Room.find({ type: "Basic" });
    const roomLuxury = await Room.find({ type: "Luxury" });
    console.log(roomBasic.length);
    console.log(roomLuxury.length);
    res.render("index", { user, header: "header", roomBasic, roomLuxury });
  }

  async bookRoom(req, res) {
    try {
      let { checkIn, checkOut, type } = req.body;

      res.redirect(
        `/booking?checkIn=${checkIn}&checkOut=${checkOut}&type=${type}`
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new SiteController();
