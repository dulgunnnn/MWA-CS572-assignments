angular.module("meanBasketball").controller("TeamController", TeamController);

function TeamController(TeamsFactory, $routeParams) {
  const vm = this;
  TeamsFactory.getOne($routeParams.id).then(function (response) {
    vm.team = response;
  });
}
