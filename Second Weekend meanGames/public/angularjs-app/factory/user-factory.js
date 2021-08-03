angular.module("meanGames").factory("UserFactory", UserFactory);

function UserFactory($http) {
  return {
    register: register,
    login: login,
  };

  function register(bodyUser) {
    return $http
      .post("/api/user/register", bodyUser)
      .then(complete)
      .catch(failed);
  }

  function login(credential) {
    return $http
      .post("/api/user/login", credential)
      .then(complete)
      .catch(failed);
  }

  function complete(response) {
    return response.data;
  }

  function failed(error) {
    return error;
  }
}
