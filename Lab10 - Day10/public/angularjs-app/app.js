angular.module("jobApp", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");

  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/job-list/index.html",
      controller: "JobsController",
      controllerAs: "vm",
    })
    .when("/jobs/:jobId", {
      templateUrl: "angularjs-app/job-item/index.html",
      controller: "JobController",
      controllerAs: "vm",
    });
}
