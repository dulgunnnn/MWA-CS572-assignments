angular.module("meanBasketball").controller("TeamsController", TeamsController);

function TeamsController(TeamsFactory) {
  const vm = this;
  vm.title = "List of all teams";
  TeamsFactory.getAll().then(function (response) {
    vm.teams = response;
  });
}
