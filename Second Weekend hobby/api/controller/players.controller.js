const mongoose = require("mongoose");
const Teams = mongoose.model("Teams");

module.exports.playersGetAll = function (req, res) {
  Teams.findById(req.params.teamId)
    .select("roster")
    .exec(function (err, team) {
      const response = {
        status: 200,
        message: team && team.roster,
      };

      if (err) {
        console.log("err", err);
        response.status = 500;
        response.message = "Something went wrong";
      } else if (!team) {
        response.status = 404;
        response.message = "Team with given ID not found";
      }

      res.status(response.status).json(response.message);
    });
};

module.exports.playersGetOne = function (req, res) {
  Teams.findById(req.params.teamId)
    .select("roster")
    .exec(function (err, team) {
      if (err) {
        console.log("err", err);
        res.status(500).json({ message: "Something went wrong" });
        return;
      }

      if (!team) {
        res.status(404).json({ message: "Team with given ID not found" });
        return;
      }

      const player = team.roster.id(req.params.playerId);

      if (player) res.status(200).json(player);
      else res.status(404).json({ message: "Player with given ID not found" });
    });
};

module.exports.playersAddOne = function (req, res) {
  Teams.findById(req.params.teamId).exec(function (err, team) {
    if (err) {
      console.log("err", err);
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (!team) {
      res.status(404).json({ message: "Team with given ID not found" });
      return;
    }

    const newPlayer = {
      _id: mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      experience: parseInt(req.body.experience),
      height: req.body.height,
      weight: parseInt(req.body.weight),
    };

    team.roster.push(newPlayer);
    team.save(function (err, team) {
      if (err) {
        console.log("err", err);
        res.status(500).json(err.message);
        return;
      }
      res
        .status(201)
        .json({ message: "Successfully added!", data: team.roster });
    });
  });
};

module.exports.playersUpdateOne = function (req, res) {
  Teams.findById(req.params.teamId).exec(function (err, team) {
    if (err) {
      console.log("err", err);
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (!team) {
      res.status(404).json({ message: "Team with given ID not found" });
      return;
    }

    const player = team.roster.id(req.params.playerId);

    if (!player) {
      res.status(404).json({ message: "Player with given ID not found" });
      return;
    }

    player.firstName = req.body.firstName;
    player.lastName = req.body.lastName;
    player.position = req.body.position;
    player.experience = parseInt(req.body.experience);
    player.height = req.body.height;
    player.weight = parseInt(req.body.weight);

    team.save(function (err, team) {
      if (err) {
        console.log("err", err);
        res.status(500).json(err.message);
        return;
      }
      res
        .status(201)
        .json({ message: "Successfully updated!", data: team.roster });
    });
  });
};

module.exports.playersPartialUpdateOne = function (req, res) {
  Teams.findById(req.params.teamId).exec(function (err, team) {
    if (err) {
      console.log("err", err);
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (!team) {
      res.status(404).json({ message: "Team with given ID not found" });
      return;
    }

    const player = team.roster.id(req.params.playerId);

    if (!player) {
      res.status(404).json({ message: "Player with given ID not found" });
      return;
    }

    if (req.body.firstName || typeof req.body.firstName == "string")
      player.firstName = req.body.firstName;
    if (req.body.lastName || typeof req.body.lastName == "string")
      player.lastName = req.body.lastName;
    if (req.body.position || typeof req.body.position == "string")
      player.position = req.body.position;
    if (req.body.experience || typeof req.body.experience == "string")
      player.experience = parseInt(req.body.experience);
    if (req.body.experience || typeof req.body.experience == "number")
      player.experience = parseInt(req.body.experience);
    if (req.body.height || typeof req.body.height == "string")
      player.height = req.body.height;
    if (req.body.weight || typeof req.body.weight == "string")
      player.weight = parseInt(req.body.weight);
    if (req.body.weight || typeof req.body.weight == "number")
      player.weight = parseInt(req.body.weight);

    team.save(function (err, team) {
      if (err) {
        console.log("err", err);
        res.status(500).json(err.message);
        return;
      }
      res
        .status(201)
        .json({ message: "Successfully updated!", data: team.roster });
    });
  });
};

module.exports.playersDeleteOne = function (req, res) {
  Teams.findById(req.params.teamId).exec(function (err, team) {
    if (err) {
      console.log("err", err);
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (!team) {
      res.status(404).json({ message: "Team with given ID not found" });
      return;
    }

    const thePlayer = team.roster.id(req.params.playerId);
    if (!thePlayer) {
      res.status(404).json({ message: "Player with given ID not found" });
      return;
    }

    thePlayer.remove();
    team.save(function (err, team) {
      if (err) {
        console.log("err", err);
        res.status(500).json(err);
        return;
      }
      res.status(202).json(team.roster);
    });
  });
};
