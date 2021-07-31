angular.module("jobApp").filter("customDate", CustomDate);

function CustomDate($filter) {
  const dateFilter = $filter("date");
  return function (dateString) {
    return dateFilter(dateString, "dd MMMM, yyyy");
  };
}
