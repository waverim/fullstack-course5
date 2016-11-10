(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope) {
  $scope.message = "";
  $scope.foods = "";

  $scope.changeMessage = function () {
    var list = $scope.foods.split(",").filter(function (item) {
        return item.trim().length != 0;
    });
    console.log(list.length);

    if (list.length === 0) {
        $scope.message = "Please enter data first";
        $scope.color = "red";
        $scope.borderColor = "border-red";
    } else {
        $scope.message = list.length <= 3 ? "Enjoy!" : "Too much!";
        $scope.color = "green";
        $scope.borderColor = "border-green";
    }
  };
}

})();
