angular.module("meanGames").factory("GamesFactory", GamesFactory);

function GamesFactory($http) {
  return {
    getAll: getAll,
    getOne: getOne,
  };

  function complete(response) {
    return response.data;
  }

  function getAll() {
    return $http.get("/api/games").then(complete);
  }

  function getOne(gameId) {
    return $http.get(`/api/games/${gameId}`).then(complete);
  }
}
