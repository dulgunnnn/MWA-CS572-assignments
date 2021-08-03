angular
  .module("meanGames")
  .controller("RegisterController", RegisterController);

function RegisterController(UserFactory) {
  const vm = this;

  vm.register = function () {
    const user = {
      username: vm.username,
      name: vm.name,
      password: vm.password,
    };
    if (!vm.password || !vm.username) {
      vm.err = "Please add a username and password";
    } else if (vm.password !== vm.passwordRepeat) {
      vm.err = "Please make sure the passwords match";
    } else {
      UserFactory.register(user)
        .then(function (response) {
          if (response.status === 500) vm.err = response.statusText;
          else {
            vm.message = "Successful registration, please login.";
            vm.err = "";
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };
}
