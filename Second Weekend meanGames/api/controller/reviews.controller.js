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

module.exports.getReview = function (req, res) {
  Game.findById(req.params.gameId)
    .select("reviews")
    .exec(function (err, result) {
      result = result.reviews.find((item) => item._id == req.params.reviewId);
      console.log("Found publisher", result);
      res.status(200).json(result);
    });
};

module.exports.updateReview = function (req, res) {
  Game.findById(req.params.gameId)
    .select("reviews")
    .exec(function (err, response) {
      result = response.reviews.find((item) => item._id == req.params.reviewId);
      result.name = req.body.name;
      result.review = req.body.review;
      result.date = req.body.date;
      response.save(function (err, updatedData) {
        if (err) {
          console.log("Error occured during update", err);
          res.status(500), json(err);
        } else {
          console.log("Updated", updatedData);
          res
            .status(201)
            .json(
              updatedData.reviews.find(
                (item) => item._id == req.params.reviewId
              )
            );
        }
      });
    });
};

module.exports.partialUpdateReview = function (req, res) {
  Game.findById(req.params.gameId)
    .select("reviews")
    .exec(function (err, response) {
      result = response.reviews.find((item) => item._id == req.params.reviewId);
      if (req.body.name) result.name = req.body.name;
      if (req.body.review) result.review = req.body.review;
      if (req.body.date) result.date = req.body.date;
      response.save(function (err, updatedData) {
        if (err) {
          console.log("Error occured during update", err);
          res.status(500), json(err);
        } else {
          console.log("Updated", updatedData);
          res
            .status(201)
            .json(
              updatedData.reviews.find(
                (item) => item._id == req.params.reviewId
              )
            );
        }
      });
    });
};

module.exports.deleteReview = function (req, res) {
  Game.findById(req.params.gameId)
    .select("reviews")
    .exec(function (err, response) {
      result = response.reviews.find((item) => item._id == req.params.reviewId);
      result.remove();
      response.save(function (err, data) {
        if (err) {
          console.log("Cannot delete", err);
          res.status(500), json(err);
        } else {
          console.log("Deleted", data);
          res.status(201).json(data);
        }
      });
    });
};
