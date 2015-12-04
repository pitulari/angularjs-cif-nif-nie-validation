var nifValidation = angular.module('nifValidation', []);

nifValidation.controller('nifValidationController', ['$scope', function($scope) {

    $scope.resetNumDocValue = function() {
      $scope.docNum = '';
    }
}]);
