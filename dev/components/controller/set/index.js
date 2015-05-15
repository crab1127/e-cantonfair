define(['../module'], function(ng) {
  var path = 'http://192.168.200.201:8080'
  ng
    .controller('SetCtrl', ['$scope', '$http','$location', function($scope, $http,$location) {
      
      $scope.name = '设置页';
      
    }])
    //账号设置
    .controller('AccountCtrl', ['$scope', '$location', '$modal', function($scope, $location, $modal){
      $scope.go = function (goal) {
        $scope.goal = goal;
        
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
    .controller('DialogCtrl',['$scope', '$modalInstance', '$location', 'goal', '$http', '$rootScope',
     function($scope, $modalInstance, $location, goal, $http, $rootScope){

      $http.get(path+ '/seller_center/sellerAccountSetting/getIssuesInfoForUser.cf', {params:{sellerId:$rootScope.userInfo.sellerId}})
        .success(function(data){
          if ('success' === data.status) {
            console.log(data.data);
            $scope.issueOptions = data.data;
          };
        })
      $scope.goal = goal;


      $scope.validat = {};
      $scope.ok = function () {
        //验证答案
        $http.get(path + '/seller_center/sellerAccountSetting/validatSecurityAnswer.cf', {
            params: $scope.validat
          })
          .success(function(data) {
            if('success' === data.status) {
            $location.path(goal)
            $modalInstance.close();
            }
          })

        
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }])
    //安全问题设置
    .controller('SecurityissueCtrl', ['$scope', '$http', '$location', '$rootScope',
      function($scope, $http, $location, $rootScope) {
        $scope.isset = $scope.isshow = false;
        $http.get(path + '/seller_center/sellerAccountSetting/validatSellerHasSecurityIssues.cf', {params: {sellerId: $rootScope.userInfo.sellerId}})
          .success(function(data){
            if ('success' === data.status) {
              $scope.isset = true;
            } else {
              $scope.isshow = true;
            }
          })
        $scope.title = "安全问题设置";
        $scope.isIssuesCustom1 = false;
        $scope.isIssuesCustom2 = false;
        $scope.isIssuesCustom3 = false;
        $scope.issueList = [
          {
            'id':1,
            'issue': '你的生日是那天'
          },{
            'id':2,
            'issue': '你的偶像是谁'
          },{
            'id':3,
            'issue': '你最喜欢的动物是什么'
          },{
            'id':4,
            'issue': '你的家乡在哪里'
          },{            
            'id':5,
            'issue': '你的家乡在哪里'
          },{
            'id':6,
            'issue': '自定义问题'
          }
        ];
        $scope.saveIssue =  {
          sellerId : $rootScope.userInfo.userId,
          saveType : 0,
          securityIssuesSystemId1 : '',
          securityIssuesCustom1: '',
          securityIssuesAnswer1: '',
          securityIssuesSystemId2 : '',
          securityIssuesCustom2: '',
          securityIssuesAnswer2: '',
          securityIssuesSystemId3 : '',
          securityIssuesCustom3: '',
          securityIssuesAnswer3: ''
        };
        $scope.selectChange = function(id){
          if(1 === id) {
            if(!$scope.saveIssue.securityIssuesSystemId1) return

            if (6 === $scope.saveIssue.securityIssuesSystemId1) {
              $scope.isIssuesCustom1 = true;
            } else {
              if ($scope.saveIssue.securityIssuesSystemId1 === $scope.saveIssue.securityIssuesSystemId2 || $scope.saveIssue.securityIssuesSystemId1 === $scope.saveIssue.securityIssuesSystemId3){
                alert('安全问题不能重复')
                $scope.saveIssue.securityIssuesSystemId1 = '';
              }
              $scope.isIssuesCustom1 = false;
            }
          }
          if(2 === id) {
            if(!$scope.saveIssue.securityIssuesSystemId1) return
            if (6 === $scope.saveIssue.securityIssuesSystemId2) {
              $scope.isIssuesCustom2 = true;              
            } else {
              if ($scope.saveIssue.securityIssuesSystemId2 === $scope.saveIssue.securityIssuesSystemId1 || $scope.saveIssue.securityIssuesSystemId2 === $scope.saveIssue.securityIssuesSystemId3){
                alert('安全问题不能重复');
                $scope.saveIssue.securityIssuesSystemId2 = '';
              }
              $scope.isIssuesCustom2 = false;
            }
          }
          if(3 === id) {
            if(!$scope.saveIssue.securityIssuesSystemId1) return
            if (6 === $scope.saveIssue.securityIssuesSystemId3) {
              $scope.isIssuesCustom3 = true;              
            } else {
              if ($scope.saveIssue.securityIssuesSystemId3 === $scope.saveIssue.securityIssuesSystemId2 || $scope.saveIssue.securityIssuesSystemId3 === $scope.saveIssue.securityIssuesSystemId1){
                alert('安全问题不能重复')
                $scope.saveIssue.securityIssuesSystemId3 = '';
              }
              $scope.isIssuesCustom3 = false;
            }
          }
        }
        $scope.submit = function(){
          $http.post(path+'seller_center/sellerAccountSetting/saveSecurityIssuesInfo',{params: $scope.saveIssue})
            .success(function(data){
              if ('success' === data.status) {
                alert('保存成功');
                setTimeout(function(){
                  console.log(1);
                  $location.path('/set')
                }, 1000);
              }
            })
        }
      }
    ])
    //个人资料
    .controller('UserCtrl', ['$scope', '$http', '$location', '$rootScope',
      function($scope, $http, $location, $rootScope) {
        $scope.user = $rootScope.userInfo;
        $scope.submit = function(){
          $.post(path + '/seller_center/informationSetting/saveSellerInfo.cf', $scope.user)
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
    .controller('CompanyCtrl', ['$scope', '$http', '$rootScope',
      function($scope, $http, $rootScope) {
        $http.get(path + '/seller_center/informationSetting/fetchCompanyInfo.cf', {params: {companyId:1}})
          .success(function(data) {
            if ('success' === data.status) {
              $scope.company = data.data;
              console.log($scope.company);
            } else {
              alert('获取公司失败，请刷新')
            }
          }).error(function(data) {
            alert('获取公司失败，请刷新')
          })
        $scope.submit = function() {
          $.post(path + 　'/seller_center/informationSetting/saveCompanyInfo.cf', $scope.company)
            .success(function(data) {
              if ('success' === data.status) {
                alert('保存公司成功')
              } else {
                alert('保存公司失败')
              }
            })
        }
      }
    ])
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
