const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true},
  gender: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("user", userSchema);
