const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;
const bookingSchema = new Schema({
  user: { type: String, require: true },
  phone: { type: String, require: true },
  room: { type: String, require: true },
  type: { type: String, require: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  roomPrice: { type: Number, require: true },
  servicePrice: { type: Number, require: true },
  services: { type: String, require: true },
  credit: { type: String, require: true },
  total: { type: Number, require: true },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
