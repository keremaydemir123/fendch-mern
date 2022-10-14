const Challenge = require("../models/challengeModel");

//! HANDLERS

exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      data: {
        challenges,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

exports.getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        challenge,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

exports.createChallenge = async (req, res) => {
  try {
    const newChallenge = await Challenge.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        challenge: newChallenge,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent",
    });
  }
};

exports.updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        challenge,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};

exports.deleteChallenge = async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
    });
  }
};
