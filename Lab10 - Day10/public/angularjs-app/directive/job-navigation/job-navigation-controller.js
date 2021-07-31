angular.module("jobApp").directive("jobNavigation", JobNavigation);

function JobNavigation() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/directive/job-navigation/nav.html",
  };
}
