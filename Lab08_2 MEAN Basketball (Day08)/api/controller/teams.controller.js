const mongoose = require("mongoose");
const Teams = mongoose.model("Teams");

module.exports.teamsGetAll = function (req, res) {
  let offset = 0;
  let count = 10;

  if (req.query && req.query.offset) offset = parseInt(req.query.offset);

  if (req.query && req.query.count) count = parseInt(req.query.count);

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({ message: "QueryString Offset and Count should be numbers" });
    return;
  }

  Teams.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, teams) {
      if (err) {
        console.log("err", err);
        res.status(500).json("Internal server error");
        return;
      }

      res.status(201).json(teams);
    });
};

module.exports.teamsGetOne = function (req, res) {
  Teams.findById(req.params.teamId).exec(function (err, team) {
    const response = {
      status: 200,
      message: team,
    };

    if (err) {
      console.log("err", err);
      response.status = 500;
      response.message = "Internal server error";
    } else if (!team) {
      response.status = 404;
      response.message = "Team with given ID not found";
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.teamsAddOne = function (req, res) {
  Teams.create(
    {
      name: req.body.name,
      year: parseInt(req.body.year),
      city: req.body.city,
      conference: req.body.conference,
      roster: req.body.roster ? req.body.roster : [],
    },
    function (err, team) {
      if (err) {
        console.log("Error creating team");
        res.status(400).json(err.message);
      } else {
        console.log("Team created", team);
        res.status(201).json(team);
      }
    }
  );
};

module.exports.teamsUpdateOne = function (req, res) {
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

    if (!(req.body.year && req.body.conference)) {
      res.status(401).json({ message: "Incorrect request body" });
      return;
    }

    team.name = req.body.name;
    team.year = parseInt(req.body.year);
    team.city = req.body.city;
    team.conference = req.body.conference;

    team.save(function (err, updatedTeam) {
      if (err) {
        console.log("err", err);
        res.status(500).json(err.message);
        return;
      }

      res.status(201).json({ message: "Successful!", data: updatedTeam });
    });
  });
};

module.exports.teamsPartialUpdateOne = function (req, res) {
  Teams.findById(req.params.teamId).exec(function (err, team) {
    if (err) {
      console.log("err", err);
      res.status(500).json({ message: err.message });
      return;
    }

    if (!team) {
      res.status(404).json({ message: "Team with given ID not found" });
      return;
    }

    if (req.body.name || typeof req.body.name === "string")
      team.name = req.body.name;
    if (req.body.year || typeof req.body.year === "number")
      team.year = parseInt(req.body.year);
    if (req.body.year || typeof req.body.year === "string")
      team.year = parseInt(req.body.year);
    if (req.body.city || typeof req.body.city === "string")
      team.city = req.body.city;
    if (req.body.conference || typeof req.body.conference === "string")
      team.conference = req.body.conference;

    team.save(function (err, updatedTeam) {
      if (err) {
        console.log("err", err);
        res.status(500).json(err);
        return;
      }

      res.status(201).json({ message: "Successful!", data: updatedTeam });
    });
  });
};

module.exports.teamsDeleteOne = function (req, res) {
  Teams.findByIdAndDelete(req.params.teamId).exec(function (err, deletedTeam) {
    const response = {
      status: 202,
      message: "Deleted!",
    };

    if (err) {
      console.log(err, err);
      response.status = 500;
      response.message = err.message;
    } else if (!deletedTeam) {
      response.status = 404;
      response.message = "Team with given ID not found";
    }

    res.status(response.status).json(response.message);
  });
};
