const { default: mongoose } = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
