angular.module("meanBasketball").filter("city", AddCity);

function AddCity() {
  return function (city) {
    if (city) {
      return "City: " + city;
    }
  };
}
