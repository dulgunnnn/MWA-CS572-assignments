angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GamesFactory, $route, AuthFactory) {
  const vm = this;
  vm.title = "Mean Games List";

  const fetchAll = function () {
    GamesFactory.getAll().then(function (response) {
      vm.games = response;
    });
  };
  fetchAll();

  vm.formGame = {}; // This will be populated by template UI

  vm.addGame = function () {
    if (vm.gameForm.$valid) {
      GamesFactory.addOneGame(vm.formGame).then(function (response) {
        if (response.status === 403 || response.status === 401) {
          alert("Unauthorized");
        } else {
          fetchAll();
        }
        vm.formGame = {};
      });
    }
  };

  vm.delete = function (gameId) {
    GamesFactory.deleteOne(gameId).then(function (response) {
      fetchAll();
    });
  };

  vm.formGameEdit = {}; // This will be populated by template UI

  vm.editGame = function (gameId) {
    GamesFactory.editGame(gameId, vm.formGameEdit).then(function (response) {
      if (response.status === 403 || response.status === 401) {
        alert("Unauthorized");
      } else {
        fetchAll();
      }
      vm.formGameEdit = {};
    });
  };

  vm.isLoggedIn = function () {
    return AuthFactory.isLoggedIn;
  };
}
