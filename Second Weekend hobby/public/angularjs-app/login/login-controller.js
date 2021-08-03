angular.module("meanBasketball").controller("LoginController", LoginController);

function LoginController(
  UserFactory,
  AuthFactory,
  $window,
  $location,
  $jwtHelper
) {
  const vm = this;

  vm.isLoggedIn = function () {
    return AuthFactory.authenticated;
  };

  vm.login = function () {
    console.log("login request angularjs");
    UserFactory.login({ username: vm.username, password: vm.username })
      .then((response) => {
        console.log("login response", response);
        if (response.success) {
          vm.err = "";
          $window.sessionStorage.token = response.token;
          const token = $window.sessionStorage.token;
          const decodedToken = jwtHelper.decodedToken(token);
          vm.loggedInUser = decodedToken.username;
          AuthFactory.isLoggedIn = true;
          vm.username = "";
          vm.password = "";
          $location.url("/");
        } else vm.err = response;
      })
      .catch((err) => {
        vm.err = err;
      });
  };

  vm.logout = function () {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.url("/");
  };

  vm.isActiveTab = function (url) {
    const currentPath = $location.path.split(".")[1];
    return url === currentPath ? "active" : "";
  };
}
