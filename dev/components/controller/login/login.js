define(['../module'], function(ng){
  var path = 'http://127.0.0.1:3000/api'
  ng.controller('loginCtrl',  ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location){
    $scope.title = '用户登录';
    $scope.user = {name: 'crab', password: ''};
    $scope.message = '';
    $scope.submit = function () {
      $http
        .get(path + '/authenticate', {"params": $scope.user})
        .success(function(data, status) {
          if ('success' === data.state){
            $window.sessionStorage.islogin = 1;
            $scope.message = 'Welcome';
            $location.path('/index')
          } else {
            delete $window.sessionStorage.islogin;
            $scope.message = '密码或者账号错误'
          }
        })
        .error(function(data){
          delete $window.sessionStorage.islogin;

          $scope.message = '密码或者账号错误'
        })
    }
 }])
});
// define(function(){
// 	return ['$scope', function($scope,$http){
// 		$scope.title = 'dd';
// 		$scope.name= '';
// 		$scope.email= '';
//         $scope.password='';
// 		$scope.$apply();
//         $scope.signupForm=function(isValid){
//             $http({
//                 method:"POST",
//                 url:'/login.cf',
//                 data:{'name':$scope.name,'password':$scope.password}
//             }).success(function(){

//             }).error(function(){

//             })
//         }
// 	}]
// });