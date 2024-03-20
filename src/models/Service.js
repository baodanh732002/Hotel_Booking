const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;
const serviceSchema = new Schema({
  name: { type: String, required: true },
  acronym: { type: String, require: true },
  price: { type: Number, required: true },
  type: { type: String, require: true },
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
