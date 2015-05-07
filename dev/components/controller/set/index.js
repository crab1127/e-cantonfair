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
    .controller('AccountCtrl', ['$scope', function($scope){

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
