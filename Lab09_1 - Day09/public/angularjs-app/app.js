angular.module("meanBasketball", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/team-list/teams.html",
      controller: "TeamsController",
      controllerAs: "vm",
    })
    .when("/teams/:id", {
      templateUrl: "angularjs-app/team-display/team.html",
      controller: "TeamController",
      controllerAs: "teamCtrl",
    });
}
