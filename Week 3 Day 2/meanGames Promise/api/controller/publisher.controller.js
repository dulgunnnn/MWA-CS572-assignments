const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getPublisher = function (req, res) {
  const _getGame = Game.findById(req.params.gameId);

  _getGame
    .then((result) => {
      if (!result)
        res.status(404).json({ message: "Game with given ID not found" });
      else if (!result.publisher)
        res.status(404).json({ message: "Publisher not found" });
      else res.status(200).json(result.publisher);
    })
    .catch((err) => {
      res.status(400).json({ message: "Wrong ID" });
    });
};

module.exports.addPublisher = function (req, res) {
  const newPublisher = {
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    country: req.body.country,
    location: null,
  };

  const updateQuery = { $set: { publisher: newPublisher } };
  const _addPublisher = Game.findByIdAndUpdate(req.params.gameId, updateQuery);

  _addPublisher
    .then((res) => {
      res.status(201).json({ message: "Publisher added" });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).json(err);
    });
};

module.exports.updatePublisher = function (req, res) {
  const updateQuery = {
    $set: {
      publisher: {
        name: req.body.name,
        country: req.body.country,
      },
    },
  };

  const findGame = Game.findByIdAndUpdate(req.params.gameId, updateQuery);

  findGame
    .then((res) => {
      res.status(201).json({ message: "Publisher updated", data: res });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.deletePublisher = function (req, res) {
  const updateQuery = { $unset: { publisher: {} } };
  const findQuery = { _id: mongoose.Types.ObjectId(req.params.gameId) };
  const findGame = Game.findOneAndUpdate(findQuery, updateQuery);

  findGame
    .then((res) => {
      res.status(201).json({ message: "Publisher delete accepted" });
    })
    .catch((err) => {
      res.status(400).json({ message: "Wrong ID" });
    });
};
