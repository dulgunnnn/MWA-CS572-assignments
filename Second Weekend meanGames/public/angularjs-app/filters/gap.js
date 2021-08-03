angular.module("meanGames").filter("gap", calculateGap);

function calculateGap() {
  return function (year) {
    if (!isNaN(year)) {
      const now = new Date().getFullYear();
      const diff = now - year;
      return diff > 0 ? diff + " years ago" : "this year";
    }
  };
}
