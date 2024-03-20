const Service = require("../models/Service");
const Room = require("../models/Room");
class ServiceController {
  // [GET]
  async servicePage(req, res) {
    const user = req.session.user || null;
    const roomId = req.query.id;
    const checkIn = req.query.checkIn;
    const checkOut = req.query.checkOut;
    console.log(roomId);
    console.log(checkIn);
    console.log(checkOut);
    const entertainmentData = await Service.find({ type: "Entertainment" });
    const mealData = await Service.find({ type: "Meal" });
    const transportData = await Service.find({ type: "Transport" });

    // let status = roomData.status ? "Available" : "Unavailable";
    res.render("service", {
      user,
      header: "header",
      entertainmentData,
      mealData,
      transportData,
      roomId,
      checkIn,
      checkOut,
    });
  }

  async serviceHandle(req, res) {
    const selectedServices = [];
    const user = req.session.user || null;
    const roomId = req.body.id;
    const checkIn = req.body.checkIn;
    const checkOut = req.body.checkOut;
    const roomData = await Room.findOne({ _id: roomId });
    // console.log(roomData);
    const roomPrice = roomData.price;
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        // Check if the key matches the acronym of a checkbox
        const service = await Service.findOne({ acronym: key });
        if (service) {
          selectedServices.push(service);
        }
      }
    }

    const totalServicePrice = selectedServices.reduce((total, service) => {
      return total + service.price;
    }, 0);

    const totalPrice = roomPrice + totalServicePrice; // Calculate the total price

    console.log(roomData);
    console.log(roomPrice);
    console.log(totalPrice);
    console.log(totalServicePrice);

    res.render("payment", {
      roomData,
      user,
      checkIn,
      checkOut,
      totalServicePrice,
      totalPrice,
      selectedServices,
    });
  }
}

module.exports = new ServiceController();
