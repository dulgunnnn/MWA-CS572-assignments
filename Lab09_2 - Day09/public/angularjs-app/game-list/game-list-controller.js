angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GamesFactory) {
  const vm = this;
  vm.title = "Mean Games List";
  GamesFactory.getAll().then(function (response) {
    vm.games = response;
  });
}
