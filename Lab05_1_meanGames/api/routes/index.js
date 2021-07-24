const express = require("express");
const controllerGames = require("../controller/games.controller");
const controllerPublisher = require("../controller/publisher.controller");

const router = express.Router();

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerGames.addGame);

router
  .route("/games/:gameId")
  .get(controllerGames.gamesGetOne)
  .put(controllerGames.updateGame)
  .patch(controllerGames.partialUpdateGame)
  .delete(controllerGames.deleteGame);

router
  .route("/games/:gameId/publisher")
  .get(controllerPublisher.getPublisher)
  .post(controllerPublisher.addPublisher);

module.exports = router;
