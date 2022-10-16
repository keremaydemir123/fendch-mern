const Challenge = require("../models/challengeModel");
const APIFeatures = require("../utils/APIFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//! HANDLERS

exports.getAllChallenges = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Challenge.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const challenges = await features.query;
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      challenges,
    },
  });
});

exports.getChallenge = catchAsync(async (req, res, next) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    return next(new AppError("No challenge found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      challenge,
    },
  });
});

exports.createChallenge = catchAsync(async (req, res, next) => {
  const newChallenge = await Challenge.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      challenge: newChallenge,
    },
  });
});

exports.updateChallenge = catchAsync(async (req, res, next) => {
  const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!challenge) {
    return next(new AppError("No challenge found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      challenge,
    },
  });
});

exports.deleteChallenge = catchAsync(async (req, res, next) => {
  const challenge = await Challenge.findByIdAndDelete(req.params.id);

  if (!challenge) {
    return next(new AppError("No challenge found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
