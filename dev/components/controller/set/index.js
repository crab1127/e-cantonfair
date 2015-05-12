define(['../module'], function(ng) {
  ng
    .controller('SetCtrl', ['$scope', '$http','$location', function($scope, $http,$location) {
      
      // if (!$scope.isLogin) {
      //    console.log(2);
      //   $location.path('/login');
      // }
      $scope.name = '设置页';
      
    }])
    //账号设置
    .controller('AccountCtrl', ['$scope', '$location', 'ngDialog', function($scope, $location, ngDialog){
      $scope.go = function (goal) {
        $scope.goal = goal;
        //
        ngDialog.open({
          template: 'viailate',
          controller: 'DialogCtrl',
          className: 'ngdialog-theme-default ngdialog-theme-custom',
          scope: $scope //将作用域传给弹窗
        });
        //
        
        
        //$location.path(goal)
      }
    }])
    .controller('DialogCtrl',['$scope', 'ngDialog', '$location', function($scope, ngDialog, $location){
      
      $scope.submit = function() {        
        $location.path($scope.goal);
        //ngDialog.closeThisDialog();
        ngDialog.close();
      }
    }])
    //个人资料
    .controller('UserCtrl', ['$scope', function($scope){
      
    }])
    //公司资料
    .controller('CompanyCtrl', ['$scope', function($scope){
      
    }])
    //收货地址
    .controller('AddressCtrl', ['$scope', function($scope){
      
    }])
    //修改邮箱
    .controller('ModifyemailCtrl', ['$scope', function($scope){
      $scope.title = '修改邮箱';
    }])
    .controller('ModifypasswordCtrl', ['$scope', function($scope){
        
    }])
    .controller('ModifymobileCtrl', ['$scope', function($scope){
        
    }])

})
