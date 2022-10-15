const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  tech: {
    type: String,
    required: [true, "Project has to contain a tech name"],
  },
  avgRating: {
    type: Number,
    min: [0, "Project's avgRating must higher than 0"],
    max: [5, "Project's avgRating must lower than 5"],
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  git: {
    type: String,
    required: [true, "Project has to contain a git"],
  },
  challengeId: {
    type: String,
    required: [true, "Project must have a challengeId"],
  },
  userId: {
    type: String,
    required: [true, "Project must have a userId"],
  },
  comments: {
    type: [Object],
    default: [],
  },
});

// eslint-disable-next-line new-cap
module.exports = new mongoose.model("Project", projectSchema);
