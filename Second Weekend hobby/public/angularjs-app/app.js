angular
  .module("meanBasketball", ["ngRoute", "angular-jwt"])
  .config(config)
  .run(run);

function config($routeProvider, $httpProvider, $locationProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/welcome/welcome.html",
      access: { restricted: false },
    })
    .when("/teams", {
      templateUrl: "angularjs-app/team-list/teams.html",
      controller: "TeamsController",
      controllerAs: "vm",
    })
    .when("/teams/:id", {
      templateUrl: "angularjs-app/team-display/team.html",
      controller: "TeamController",
      controllerAs: "teamCtrl",
    })
    .when("/register", {
      templateUrl: "angularjs-app/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
      access: { restricted: false },
    })
    .when("/profile", {
      templateUrl: "angularjs-app/profile/profile.html",
      controllerAs: "vm",
      access: { restricted: true },
    })
    .otherwise({ redirectTo: "/" });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on(
    "$routeChangeStart",
    function (event, nextRoute, currentRoute) {
      if (
        nextRoute.access !== undefined &&
        nextRoute.access.restricted &&
        !$window.sessionStorage.token &&
        !AuthFactory.isLoggedIn
      ) {
        event.preventDefault();
        $location.path("/");
      }
    }
  );
}
