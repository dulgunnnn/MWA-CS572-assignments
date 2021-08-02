angular.module("meanGames").directive("navigation", Navigation);

function Navigation() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/navigation/nav.html",
  };
}
