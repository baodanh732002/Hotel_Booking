const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;
const roomSchema = new Schema({
  name: { type: String, required: true },
  noP: { type: Number, require: true },
  price: { type: Number, required: true },
  description: { type: String },
  type: { type: String },
  image: { type: String },
  status: { type: Boolean, default: true },
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
