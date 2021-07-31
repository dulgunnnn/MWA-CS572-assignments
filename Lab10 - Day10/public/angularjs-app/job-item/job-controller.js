angular.module("jobApp").controller("JobController", JobController);

function JobController(JobFactory, $routeParams) {
  const vm = this;

  JobFactory.getOne($routeParams.jobId).then(function (response) {
    vm.job = response;
  });
}
