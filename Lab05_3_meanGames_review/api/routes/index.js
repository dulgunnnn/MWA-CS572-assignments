const express = require("express");
const controllerGames = require("../controller/games.controller");
const controllerReviews = require("../controller/reviews.controller");

const router = express.Router();

router.route("/games").get(controllerGames.gamesGetAll);

router.route("/games/:gameId").get(controllerGames.gamesGetOne);

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

module.exports = router;
