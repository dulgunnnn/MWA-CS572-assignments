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
