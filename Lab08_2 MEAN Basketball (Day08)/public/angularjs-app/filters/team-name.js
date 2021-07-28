angular.module("meanBasketball").filter("name", AddName);

function AddName() {
  return function (name) {
    if (name) {
      return "Name: " + name;
    }
  };
}
