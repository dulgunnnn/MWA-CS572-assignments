angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/game-list/games.html",
      controller: "GamesController",
      controllerAs: "vm",
    })
    .when("/games/:id", {
      templateUrl: "angularjs-app/game-display/game.html",
      controller: "GameController",
      controllerAs: "gameCtrl",
    });
}
