const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getReviews = function (req, res) {
  Game.findById(req.params.gameId)
    .select("reviews")
    .exec(function (err, result) {
      console.log("Found publisher", result);
      res.status(200).json(result);
    });
};

module.exports.addReview = function (req, res) {
  Game.findById(req.params.gameId).exec(function (err, game) {
    const newReview = {
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      review: req.body.review,
      date: req.body.date,
    };

    if (game.reviews == "") game.reviews = [];
    game.reviews.push(newReview);
    game.save(function (err, game) {
      if (err) console.log("err", err);
      res.status(201).send("Review added");
    });
  });
};
