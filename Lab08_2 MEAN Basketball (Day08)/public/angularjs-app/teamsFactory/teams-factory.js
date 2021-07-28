angular.module("meanBasketball").factory("TeamsFactory", TeamsFactory);

function TeamsFactory($http) {
  return {
    getAll: getAll,
    getOne: getOne,
  };

  function complete(response) {
    return response.data;
  }

  function getAll() {
    return $http.get("/api/teams").then(complete);
  }

  function getOne(teamId) {
    return $http.get(`/api/teams/${teamId}`).then(complete);
  }
}
