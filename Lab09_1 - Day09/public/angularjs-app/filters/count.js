angular.module("meanBasketball").filter("count", Count);

function Count() {
  return function (arr) {
    return arr.length;
  };
}
