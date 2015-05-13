define(['../module'], function(ng) {
  var path = 'http://127.0.0.1:3000/';
  ng
    .controller('SetCtrl', ['$scope', '$http','$location', function($scope, $http,$location) {
      
      // if (!$scope.isLogin) {
      //    console.log(2);
      //   $location.path('/login');
      // }
      $scope.name = '设置页';
      
    }])
    //账号设置
    .controller('AccountCtrl', ['$scope', '$location', '$modal', function($scope, $location, $modal){
      $scope.go = function (goal) {
        $scope.goal = goal;
        //
        // ngDialog.open({
        //   template: 'viailate',
        //   controller: 'DialogCtrl',
        //   className: 'ngdialog-theme-default ngdialog-theme-custom',
        //   scope: $scope //将作用域传给弹窗
        // });
        //
        var modalViailat = $modal.open({
          animation: true,
          templateUrl: 'viailate.html',
          controller: 'DialogCtrl',
          size: '',
          scope: $scope,
          resolve: {
            goal: function () {
              return $scope.goal;
            }
          }
        });
        modalViailat.result.then(
          function(selectedItem) {
            console.log(2123);
            $scope.selected = selectedItem;
          }, 
          function() {
            console.log(22222);
            //$log.info('Modal dismissed at: ' + new Date());
          }
        );
        //modalViailat.result.then(function())  
        
        //$location.path(goal)
      }
    }])
    .controller('DialogCtrl',['$scope', '$modalInstance', '$location', 'goal', '$http', function($scope, $modalInstance, $location, goal, $http){
      
      $scope.goal = goal;
      $scope.issue = 1;
      $scope.answer = '';

      $scope.ok = function () {
        //验证答案
        // $http.get('',{params: $scope.security}).success(function(){

          $location.path(goal)
          $modalInstance.close();
        // })

        
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }])
    //安全问题设置
    .controller('SecurityissueCtrl', ['$scope', function($scope){
      
    }])
    //个人资料
    .controller('UserCtrl', ['$scope', '$http', '$location', 'userService',
      function($scope, $http, $location, userService) {
        $scope.user = userService;
        $scope.submit = function(){
          $http.post(path + 'buyer/saveBuyerInfo', {params: $scope.user})
            .success(function(data){
              alert(data.message);
              if ('success' === data.status) {
                $location.path('/sets')
              }
            })
        }
      }
    ])
    //公司资料
    .controller('CompanyCtrl', ['$scope', function($scope){
      
    }])
    //收货地址
    .controller('AddressCtrl', ['$scope', function($scope){
      
    }])
    //修改邮箱
    .controller('ModifyemailCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location){
      $scope.title = '修改邮箱';
      $scope.email = {};
      $scope.submit = function(){
        //验证当前邮箱是否正确

        $http.get(path + 'Modifyemail',{params: $scope.email}).success(function(data){
          if('success' === data.status) {
            alert(data.message)
            $location.path('/set/account')
          } else {
            alert(data.message)
          }
        })
      }
    }])
    .controller('ModifymobileCtrl', ['$scope', '$http', '$location', 'userService',
      function($scope, $http, $location, userService) {
        $scope.mobile = {};
        $scope.mobile.cur = userService.mobile;
        $scope.getCode = function() {
          $http.get(path + 　'getCode', {
            params: {
              mobile: $scope.mobile.cur
            }
          }).success(function(data) {
            if ('success' === data.status) {
              alert(data.message)
            } else {
              alert(data.message)
            }
          })
        }
        $scope.submit = function() {
          $http.get(path + 　'modifymobile', {
            params: $scope.mobile
          }).success(function(data) {
            if ('success' === data.status) {
              alert(data.message)
              $location.path('/set/account')
            } else {
              alert(data.message)
            }
          })
        }
      }
    ])
    //
    .controller('ModifypassCtrl', ['$scope', 'userService', '$location',
      function($scope, userService, $location) {
        $scope.name = userService.name;
        $scope.password = {};
        $scope.submit = function() {
          //验证密码
          alert('修改成功');
          $location.path('/set/account')
        }
      }
    ])

})
