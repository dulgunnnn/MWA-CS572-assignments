const dbConnection = require("../data/dbConnection");
dbConnection.open();
const { ObjectId } = require("mongodb").ObjectId;

module.exports.getGames = function (req, res) {
  const db = dbConnection.get();
  const collection = db.collection("games");
  const count =
    req.params.numberOfGames && parseInt(req.params.numberOfGames) <= 7
      ? parseInt(req.params.numberOfGames)
      : 7;
  collection
    .find()
    .limit(count)
    .toArray(function (err, games) {
      console.log("Found games", games);
      res.status(200).json(games);
    });
};

module.exports.getFiveGames = function (req, res) {
  const db = dbConnection.get();
  const collection = db.collection("games");
  collection
    .find()
    .limit(5)
    .toArray(function (err, games) {
      console.log("Found games", games);
      res.status(200).json(games);
    });
};
