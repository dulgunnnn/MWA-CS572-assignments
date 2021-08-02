const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.gamesGetAll = function (req, res) {
  let offset = 0;
  let count = 7;

  if (req.query && req.query.offset) offset = parseInt(req.query.offset, 10);

  if (req.query && req.query.count) count = parseInt(req.query.count, 10);

  Game.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, games) {
      console.log("Found games", games);
      res.status(200).json(games);
    });
};

module.exports.getPublisher = function (req, res) {
  Game.findById(req.params.gameId)
    .select("publisher")
    .exec(function (err, result) {
      console.log("Found publisher", result);
      res.status(200).json(result);
    });
};

module.exports.addPublisher = function (req, res) {
  Game.findById(req.params.gameId).exec(function (err, game) {
    if (game.publisher !== null)
      res.status(409).send("Publisher already exists");
    else {
      const newPublisher = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        country: req.body.country,
      };
      game.publisher = newPublisher;
      game.save(function (err, game) {
        if (err) console.log("err", err);
        res.status(201).send("Publisher added");
      });
    }
  });
};

module.exports.updatePublisher = function (req, res) {
  Game.findById(req.params.gameId).exec(function (err, game) {
    if (game.publisher === null)
      res.status(404).send("Publisher does not exists");
    else {
      game.publisher.name = req.body.name;
      game.publisher.country = req.body.country;

      game.save(function (err, game) {
        if (err) console.log("err", err);
        res.status(201).send("Publisher updated");
      });
    }
  });
};

module.exports.partialUpdatePublisher = function (req, res) {
  Game.findById(req.params.gameId).exec(function (err, game) {
    if (game.publisher === null)
      res.status(404).send("Publisher does not exists");
    else {
      if (req.body.name) game.publisher.name = req.body.name;
      if (req.body.country) game.publisher.country = req.body.country;

      game.save(function (err, game) {
        if (err) console.log("err", err);
        res.status(201).send("Publisher updated");
      });
    }
  });
};

module.exports.deletePublisher = function (req, res) {
  Game.findByIdAndDelete(req.params.gameId).exec(function (err, game) {
    if (err) {
      console.log("err", err);
      res.status(500).json(err);
    } else {
      res.status(201).send("Publisher updated");
    }
  });
};
