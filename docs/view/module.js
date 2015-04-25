define('angular', function(angular){
  angular.module('webapp.ctrl.module', [])
    .controller('module', ['$scope', function($scope){
      $scope.title = 'dd'
    }])
})