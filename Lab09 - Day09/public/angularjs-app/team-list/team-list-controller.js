angular.module("meanBasketball").controller("TeamsController", TeamsController);

function TeamsController(TeamsFactory) {
  const vm = this;
  vm.title = "Team List";
  const fetchAll = function () {
    TeamsFactory.getAll().then(function (response) {
      vm.teams = response;
    });
  };
  fetchAll();

  vm.formTeam = {}; // This will be populated by template UI

  vm.addTeam = function () {
    if (vm.teamForm.$valid) {
      TeamsFactory.addOneTeam(vm.formTeam).then(function (response) {
        fetchAll();
      });
    }
  };

  vm.formTeamEdit = {}; // This will be populated by template UI
  vm.editTeam = function (teamId) {
    TeamsFactory.editTeam(teamId, vm.formTeamEdit).then(function (response) {
      vm.formTeamEdit = {};
      fetchAll();
    });
  };

  vm.delete = function (teamId) {
    TeamsFactory.deleteOne(teamId).then(function (response) {
      console.log(response);
      fetchAll();
    });
  };
}
