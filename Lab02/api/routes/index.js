const express = require("express");
const controllerGames = require("../controller/games.controller");
const controllerAdd = require("../controller/add.controller");

const router = express.Router();

router
  .route("/games")
  .get(controllerGames.gamesGetAll)
  .post(controllerGames.gamesPostAll);

router.route("/games/:gameId").get(controllerGames.gamesGetOne);

router.route("/add/:number").get(controllerAdd.addNumbers);

module.exports = router;
