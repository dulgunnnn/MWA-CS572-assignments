const express = require("express");
const controllerGames = require("../controller/games.controller");
const controllerReviews = require("../controller/reviews.controller");
const controllerPublisher = require("../controller/publisher.controller");
const controllerUsers = require("../controller/users.controller");

const router = express.Router();

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerUsers.authenticate, controllerGames.addGame);

router
  .route("/games/:gameId")
  .get(controllerGames.gamesGetOne)
  .patch(controllerUsers.authenticate, controllerGames.partialUpdateGame)
  .delete(controllerUsers.authenticate, controllerGames.deleteGame);

router
  .route("/games/:gameId/reviews")
  .get(controllerReviews.getReviews)
  .post(controllerReviews.addReview);

router
  .route("/games/:gameId/reviews/:reviewId")
  .get(controllerReviews.getReview)
  .put(controllerReviews.updateReview)
  .patch(controllerReviews.partialUpdateReview)
  .delete(controllerReviews.deleteReview);

router
  .route("/games/:gameId/publisher")
  .get(controllerPublisher.getPublisher)
  .post(controllerPublisher.addPublisher)
  .put(controllerPublisher.updatePublisher)
  .patch(controllerPublisher.partialUpdatePublisher)
  .delete(controllerPublisher.deletePublisher);

module.exports = router;
