const express = require("express");
const controllerGames = require("../controller/games.controller");
const controllerPublisher = require("../controller/publisher.controller");
const controllerReviews = require("../controller/reviews.controller");

const router = express.Router();

router.route("/games").get(controllerGames.gamesGetAll);

router.route("/games/:gameId").get(controllerGames.gamesGetOne);

router
  .route("/games/:gameId/publisher")
  .get(controllerPublisher.getPublisher)
  .post(controllerPublisher.addPublisher);

router
  .route("/games/:gameId/reviews")
  .get(controllerReviews.getReviews)
  .post(controllerReviews.addReview);

module.exports = router;
