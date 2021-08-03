const express = require("express");
const controllerTeams = require("../controller/teams.controller");
const controllerPlayers = require("../controller/players.controller");
const controllerUsers = require("../controller/users.controller");

const router = express.Router();

router
  .route("/teams")
  .get(controllerTeams.teamsGetAll)
  .post(controllerUsers.authenticate, controllerTeams.teamsAddOne);

router
  .route("/teams/:teamId")
  .get(controllerTeams.teamsGetOne)
  .put(controllerUsers.authenticate, controllerTeams.teamsUpdateOne)
  .patch(controllerUsers.authenticate, controllerTeams.teamsPartialUpdateOne)
  .delete(controllerUsers.authenticate, controllerTeams.teamsDeleteOne);

router
  .route("/teams/:teamId/players")
  .get(controllerPlayers.playersGetAll)
  .post(controllerPlayers.playersAddOne);

router
  .route("/teams/:teamId/players/:playerId")
  .get(controllerPlayers.playersGetOne)
  .put(controllerPlayers.playersUpdateOne)
  .patch(controllerPlayers.playersPartialUpdateOne)
  .delete(controllerPlayers.playersDeleteOne);

module.exports = router;
