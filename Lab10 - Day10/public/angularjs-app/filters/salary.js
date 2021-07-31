angular.module("jobApp").filter("salary", Salary);

function Salary() {
  return function (salary) {
    return `$${salary}`;
  };
}
