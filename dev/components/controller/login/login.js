define(['../module'], function(ng){
  var path = 'http://127.0.0.1:3000/api';
  ng.controller('loginCtrl',  ['$scope', '$http', '$window', '$location', '$rootScope',function($scope, $http, $window, $location,$rootScope){
    $scope.title = '用户登录';
    $scope.user = {};
    $scope.message = '';
    $scope.submit = function () {
      $http
        .get(path + '/authenticate', {"params": $scope.user})
        .success(function(data, status) {
          if ('success' === data.status){
            $window.sessionStorage.islogin = 1;
            
            //设置登入状态
            $rootScope.isLogin = true;
            $rootScope.userInfo = data.data;
            localStorage.token = data.data.token;
            localStorage.userInfo = JSON.stringify(data);

            $scope.message = 'Welcome';
            $location.path('/index');

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