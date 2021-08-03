angular.module("meanGames").controller("GameController", GameController);

function GameController(GamesFactory, $routeParams) {
  const vm = this;
  GamesFactory.getOne($routeParams.id).then(function (response) {
    vm.game = response;
  });
}
