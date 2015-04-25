define(['angular'], function(angular) {
  console.log(angular);
	// return angular.module('webapp.ctrl', [
	// 	'webapp.ctrl.module'
	// ])
  angular.module('webapp', [])
    .controller('Controller', ['$scope', function($scope) {
    $scope.title = 'ddd'
  }])

//   app.controller('Controller', function($scope) {
//     $scope.message = 'test';
    
// });
})
