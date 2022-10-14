const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "user must have a username field"],
  },
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("User", userSchema);
