const express = require("express");
const {
  getAllChallenges,
  createChallenge,
  getChallenge,
  updateChallenge,
  deleteChallenge,
} = require("../controllers/challengeController");

const router = express.Router();

router.route("/").get(getAllChallenges).post(createChallenge);

router
  .route("/:id")
  .get(getChallenge)
  .patch(updateChallenge)
  .delete(deleteChallenge);

module.exports = router;
