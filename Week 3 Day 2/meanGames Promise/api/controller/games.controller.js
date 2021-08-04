const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.gamesGetAll = function (req, res) {
  let offset = 0;
  let count = 7;

  if (req.query && req.query.offset) offset = parseInt(req.query.offset, 10);

  if (req.query && req.query.count) count = parseInt(req.query.count, 10);

  const getAllPromise = Game.find().skip(offset).limit(count);

  getAllPromise
    .then(function (games) {
      res.status(200).json(games);
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

module.exports.gamesGetOne = function (req, res) {
  const getOnePromise = Game.findById(req.params.gameId);
  getOnePromise
    .then(function (games) {
      if (!games)
        res.status(404).json({ message: "Game with given ID not found" });
      else res.status(200).json(games);
    })
    .catch((err) => {
      res.status(400).json({ message: "ID is wrong" });
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
  const promise = Game.create(newGame);
  promise
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.deleteGame = function (req, res) {
  const deletePromise = Game.findByIdAndDelete(req.params.gameId);
  deletePromise
    .then((response) => {
      if (!response)
        res.status(404).json({ message: "Game with given ID not found" });
      else res.status(201).json({ message: "Delete Accepted" });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

module.exports.partialUpdateGame = function (req, res) {
  const findGame = Game.findById(req.params.gameId);

  findGame.then((game) => {
    if (!game) {
      res.status(404).json("Game with given ID not found");
      return;
    }

    if (req.body.title) game.title = req.body.title;
    if (req.body.year) game.year = parseInt(req.body.year);
    if (req.body.price) game.price = parseFloat(req.body.price);
    if (req.body.designer) game.designer = req.body.designer;
    if (req.body.minPlayers) game.minPlayers = parseInt(req.body.minPlayers);
    if (req.body.maxPlayers) game.maxPlayers = parseInt(req.body.maxPlayers);
    if (req.body.rate) game.rate = parseFloat(req.body.rate);

    const save = game.save();
    save
      .then((updatedGame) => {
        res.status(201).json(updatedGame);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};
