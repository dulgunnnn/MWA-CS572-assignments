const gamesData = require("../data/games.json");

module.exports.gamesGetAll = function (req, res) {
  console.log("GetAll games");
  const count = 5;
  const offset = 0;
  const pageGames = gamesData.slice(offset, offset + count);
  res.status(200).json(pageGames);
};

module.exports.gamesPostAll = function (req, res) {
  console.log("PostAll games");
  res.status(200).json({ jsonData: false });
};

module.exports.gamesGetOne = function (req, res) {
  console.log("GetOne games");
  const gameId = req.params.gameId;
  const theGame = gamesData[gameId];
  res.status(200).json(theGame);
};
