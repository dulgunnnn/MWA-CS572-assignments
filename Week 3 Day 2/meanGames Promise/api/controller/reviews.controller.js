const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.getReviews = function (req, res) {
  const findGame = Game.findById(req.params.gameId);

  findGame
    .then((result) => {
      if (!result)
        res.status(404).json({ message: "Game with given ID not found" });
      else res.status(200).json(result.reviews);
    })
    .catch((err) => {
      res.status(400).json({ message: "Wrong ID" });
    });
};

module.exports.addReview = function (req, res) {
  const findGame = Game.findById(req.params.gameId);

  findGame
    .then((game) => {
      const newReview = {
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        review: req.body.review,
        date: req.body.date,
      };

      if (game.reviews == "") game.reviews = [];
      game.reviews.push(newReview);
      const save = game.save();

      save
        .then((res) => {
          res.status(201).json({ message: "Review added", data: res });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.getReview = function (req, res) {
  const findGame = Game.findById(req.params.gameId);
  findGame
    .then((result) => {
      if (!result) {
        res.status(400).json({ message: "Game with given ID not found" });
        return;
      }
      result = result.reviews.find((item) => item._id == req.params.reviewId);
      console.log("Found publisher", result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports.updateReview = function (req, res) {
  const findGame = Game.findById(req.params.gameId);

  findGame
    .then((response) => {
      result = response.reviews.find((item) => item._id == req.params.reviewId);
      result.name = req.body.name;
      result.review = req.body.review;
      result.date = req.body.date;
      response
        .save()
        .then((updatedData) => {
          res
            .status(201)
            .json(
              updatedData.reviews.find(
                (item) => item._id == req.params.reviewId
              )
            );
        })
        .catch((err) => {
          res.status(500), json(err);
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "Wrong ID" });
    });
};

module.exports.partialUpdateReview = function (req, res) {
  const findGame = Game.findById(req.params.gameId);

  findGame
    .then((response) => {
      result = response.reviews.find((item) => item._id == req.params.reviewId);
      if (req.body.name) result.name = req.body.name;
      if (req.body.review) result.review = req.body.review;
      if (req.body.date) result.date = req.body.date;
      response
        .save()
        .then((updatedData) => {
          res
            .status(201)
            .json(
              updatedData.reviews.find(
                (item) => item._id == req.params.reviewId
              )
            );
        })
        .catch((err) => {
          res.status(500), json(err);
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "Wrong ID" });
    });
};

module.exports.deleteReview = function (req, res) {
  const findGame = Game.findById(req.params.gameId);

  findGame
    .then((response) => {
      result = response.reviews.find((item) => item._id == req.params.reviewId);
      result.remove();
      response
        .save()
        .then((data) => {
          res.status(201).json({ message: "Delete review accepted" });
        })
        .catch((err) => {
          res.status(500), json(err);
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "Wrong ID" });
    });
};
