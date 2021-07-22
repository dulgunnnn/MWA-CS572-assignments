const express = require("express");
const controllerGames = require("../controller/games.controller");

const router = express.Router();

router.route("/games").get(controllerGames.getFiveGames);

router.route("/games/:numberOfGames").get(controllerGames.getGames);

module.exports = router;
