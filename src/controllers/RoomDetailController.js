const Room = require("../models/Room");
class RoomDetailController {
  // [GET] /contact
  async roomDetailPage(req, res) {
    const user = req.session.user || null;
    const roomId = req.query.id;
    const roomData = await Room.findById(roomId);
    const checkIn = req.query.checkIn;
    const checkOut = req.query.checkOut;
    let status = roomData.status ? "Available" : "Unavailable";
    res.render("room_detail", {
      user,
      header: "header",
      roomData,
      status,
      checkIn,
      checkOut,
    });
  }
}

module.exports = new RoomDetailController();
