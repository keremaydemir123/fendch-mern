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
    default: Date.now(),
  },
  secretChallenge: {
    type: Boolean,
    default: false,
  },
});

challengeSchema.pre(/^find/, function (next) {
  this.find({ secretChallenge: { $ne: true } });
  next();
});
challengeSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretChallenge: { $ne: true } } });
  next();
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Challenge", challengeSchema);
