define(['../module'], function(ng) {
  var path = 'http://192.168.200.201:8080'
  ///seller_center/addressSetting/fetchSellerAddrInfo.cf?sellerId=1&CompanyId=1&addressManagementType=2
  ng
    //收货地址
    .controller('AddressCtrl', ['$scope', '$http', '$modal', '$rootScope',
      function($scope, $http, $modal, $rootScope) {
        //地址最大数量
        $scope.maxCount = 5;

        var params = {
          'sellerId' : $rootScope.userInfo.id,
          'CompanyId': $rootScope.userInfo.CompanyId,
          //地址类型  1：发货地址; 2退货地址
          'addressManagementType':1
        }
        //获取地址
        $http.get(path + '/seller_center/addressSetting/fetchSellerAddrInfo.cf', {params: params})
          .success(function(data){
            $scope.addressGather = [];
            if ('success' === data.status) {
              $scope.addressGather = data.data;
            }
          })

        //删除地址
        $scope.remove = function(index) {
          if (confirm("确认删除？")) {
            var addressManagementId = $scope.addressGather[index].addressManagementId

            $.post(path + '/seller_center/addressSetting/deleteSellerAddrInfo.cf', 
              {'addressManagementId': addressManagementId},
              function(data){
                if ('success' === data.status) {
                  alert(data.message)               
                  $scope.addressGather.splice(index, 1)
                } else {
                  alert(data.message)
                }
              })
          };         
        }

        //修改地址
        $scope.modify = function(index) {
          console.log(index);
          var addAddress = $modal.open({
            animation: true,
            templateUrl: 'addAddress.html',
            controller: 'AddAddressCtrl',
            size: '',
            scope: $scope,
            resolve: {
              index: function () {
                return index;
              }
            }
          })
        }

        //添加地址
        $scope.add = function() {
          if ($scope.addressGather.length >= $scope.maxCount ) {
            alert('最多添加5个地址');
            return;
          }
          var addAddress = $modal.open({
            animation: true,
            templateUrl: 'addAddress.html',
            controller: 'AddAddressCtrl',
            size: '',
            scope: $scope,
            resolve: {
              index: function () {
                return -1;
              }
            }
          })
        }
      }
    ])
    .controller('AddAddressCtrl', ['$scope', '$http', '$modalInstance', 'index', '$rootScope',
      function($scope, $http, $modalInstance, index, $rootScope) {
        if (-1 === index) {
          $scope.title = "添加地址";
          $scope.address = {}
          //$scope.address.addressManagementId = $scope.addressGather[$scope.addressGather.length-1].addressManagementId + 1
          $scope.address.addressManagementId = $scope.addressGather + 1;
        } else {
          $scope.title = "修改地址";
          $scope.address = $scope.addressGather[index];
        }
        console.log(index); 
        

        //卖家id
        $scope.address.sellerId = $rootScope.userInfo.id;
        //公司id
        $scope.address.companyId = $rootScope.userInfo.companyId;

        //判断是更新还是新政
        //type = (-1 === index) ? 1 : 0;
        $scope.submit = function(){
          console.log($scope.address);
          $.post(path + '/seller_center/addressSetting/saveSellerAddrInfo.cf', $scope.address)
            .success(function(data){
              if ('success' === data.status) { 
                if (-1 === index) {
                  $scope.addressGather.push($scope.address);
                } else {
                  $scope.addressGather[index] = $scope.address
                }            
                alert(data.message);
                $modalInstance.close();
              } else {
                alert(data.message);
              }
            })  
        }
        $scope.cancel = function(){
          $modalInstance.dismiss('cancel')
        }
      }
    ])
    //退货地址
    .controller('returnsAddressCtrl', ['$scope', '$http', '$modal', '$rootScope',
      function($scope, $http, $modal, $rootScope){
        $scope.title = "退货地址";
         $scope.maxCount = 5;

        var params = {
          'sellerId' : $rootScope.userInfo.id,
          'CompanyId': $rootScope.userInfo.CompanyId,
          //地址类型  1：发货地址; 2退货地址
          'addressManagementType':2
        }
        //获取地址
        $http.get(path + '/seller_center/addressSetting/fetchSellerAddrInfo.cf', {params: params})
          .success(function(data){
            $scope.addressGather = [];
            if ('success' === data.status) {
              $scope.addressGather = data.data;
            } else {              
              alert(data.message)
            }
          })

        //删除地址
        $scope.remove = function(index) {
          if (confirm("确认删除？")) {
            var addressManagementId = $scope.addressGather[index].addressManagementId

            $.post(path + '/seller_center/addressSetting/deleteSellerAddrInfo.cf', 
              {'addressManagementId': addressManagementId},
              function(data){
                if ('success' === data.status) {
                  alert(data.message)               
                  $scope.addressGather.splice(index, 1)
                } else {
                  alert(data.message)
                }
              })
            // $http.post(path + '/seller_center/addressSetting/deleteSellerAddrInfo.cf', {params:{'addressManagementId': addressManagementId}})
            //   .success(function(data){
            //     if ('success' === data.status) {
            //       alert(data.message)               
            //       $scope.addressGather.splice(index, 1)
            //     } else {
            //       alert(data.message)
            //     }
            //   }) 
          };         
        }

        //修改地址
        $scope.modify = function(index) {
          console.log(index);
          var addAddress = $modal.open({
            animation: true,
            templateUrl: 'addAddress.html',
            controller: 'AddAddressCtrl',
            size: '',
            scope: $scope,
            resolve: {
              index: function () {
                return index;
              }
            }
          })
        }

        //添加地址
        $scope.add = function() {
          if ($scope.addressGather.length >= $scope.maxCount ) {
            alert('最多添加5个地址');
            return;
          }
          var addAddress = $modal.open({
            animation: true,
            templateUrl: 'addAddress.html',
            controller: 'AddAddressCtrl',
            size: '',
            scope: $scope,
            resolve: {
              index: function () {
                return -1;
              }
            }
          })
        }
      }      
    ])
})