angular.module("meanBasketball").factory("TeamsFactory", TeamsFactory);

function TeamsFactory($http) {
  return {
    getAll: getAll,
    getOne: getOne,
    addOneTeam: addOne,
    deleteOne: deleteOne,
    editTeam: editOne,
  };

  function complete(response) {
    return response.data;
  }

  function fail(error) {
    return error;
  }

  function getAll() {
    return $http.get("/api/teams").then(complete).catch(fail);
  }

  function getOne(teamId) {
    return $http.get(`/api/teams/${teamId}`).then(complete).catch(fail);
  }

  function addOne(bodyTeam) {
    return $http.post(`/api/teams/`, bodyTeam).then(complete).catch(fail);
  }

  function deleteOne(teamId) {
    return $http.delete(`/api/teams/${teamId}`).then(complete).catch(fail);
  }

  function editOne(teamId, bodyTeam) {
    return $http
      .patch(`/api/teams/${teamId}`, bodyTeam)
      .then(complete)
      .catch(fail);
  }
}
