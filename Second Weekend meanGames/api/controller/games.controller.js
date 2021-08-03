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

module.exports.gamesGetOne = function (req, res) {
  Game.findById(req.params.gameId).exec(function (err, games) {
    console.log("Found games", games);
    res.status(200).json(games);
  });
};

module.exports.addGame = function (req, res) {
  const newGame = {
    title: req.body.title,
    year: parseInt(req.body.year),
    price: parseFloat(req.body.price),
    designer: req.body.designer,
    publisher: { name: "empty", location: [] },
    minPlayers: parseInt(req.body.minPlayers),
    maxPlayers: parseInt(req.body.maxPlayers),
    rate: parseFloat(req.body.rate),
  };
  Game.create(newGame, function (err, game) {
    if (err) {
      console.log("err", err);
      res.status(400).json(err);
    } else {
      console.log("Successfully created", game);
      res.status(201).json(game);
    }
  });
};

module.exports.deleteGame = function (req, res) {
  Game.findByIdAndDelete(req.params.gameId).exec(function (err, deletedGame) {
    const response = {
      status: 202,
      message: "Deleted!",
    };

    if (err) {
      console.log(err, err);
      response.status = 500;
      response.message = err.message;
    } else if (!deletedGame) {
      response.status = 404;
      response.message = "Game with given ID not found";
    }

    res.status(response.status).json(response.message);
  });
};

module.exports.partialUpdateGame = function (req, res) {
  Game.findById(req.params.gameId).exec(function (err, game) {
    if (req.body.title) game.title = req.body.title;
    if (req.body.year) game.year = parseInt(req.body.year);
    if (req.body.price) game.price = parseFloat(req.body.price);
    if (req.body.designer) game.designer = req.body.designer;
    if (req.body.publisher) game.publisher = { name: "empty", location: [] };
    if (req.body.minPlayers) game.minPlayers = parseInt(req.body.minPlayers);
    if (req.body.maxPlayers) game.maxPlayers = parseInt(req.body.maxPlayers);
    if (req.body.rate) game.rate = parseFloat(req.body.rate);
    game.save(function (err, updatedGame) {
      if (err) {
        console.log("err", err);
        res.status(400).json(err);
      } else {
        console.log("Successfully updated", updatedGame);
        res.status(201).json(updatedGame);
      }
    });
  });
};
