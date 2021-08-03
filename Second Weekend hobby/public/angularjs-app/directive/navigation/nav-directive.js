angular.module("meanBasketball").directive("navigation", Navigation);

function Navigation() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/directive/navigation/nav.html",
  };
}
