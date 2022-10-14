const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  tech: {
    type: String,
    required: [true, "challenge must have a tech field"],
  },
  task: {
    type: String,
    required: [true, "challenge must have a task"],
  },
  todos: {
    type: [String],
    required: [true, "challenge must have a todos array"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Challenge", challengeSchema);
