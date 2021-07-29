angular.module("meanGames").factory("GamesFactory", GamesFactory);

function GamesFactory($http) {
  return {
    getAll: getAll,
    getOne: getOne,
    addOneGame: addOne,
    deleteOne: deleteOne,
    editGame: editGame,
  };

  function complete(response) {
    return response.data;
  }

  function fail(error) {
    return error;
  }

  function getAll() {
    return $http.get("/api/games?count=15&offset=20").then(complete);
  }

  function getOne(gameId) {
    return $http.get(`/api/games/${gameId}`).then(complete);
  }

  function addOne(bodyGame) {
    return $http.post(`/api/games/`, bodyGame).then(complete).catch(fail);
  }

  function deleteOne(gameId) {
    return $http.delete(`/api/games/${gameId}`).then(complete).catch(fail);
  }

  function editGame(gameId, bodyGame) {
    return $http
      .patch(`/api/games/${gameId}`, bodyGame)
      .then(complete)
      .catch(fail);
  }
}
