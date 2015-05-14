define(['../module'], function(ng) {
  var path = 'http://127.0.0.1:3000'
  ng
    .controller('AddressCtrl', ['$scope', '$http', '$modal',
      function($scope, $http, $modal) {
        //地址最大数量
        $scope.maxCount = 5;
        console.log(22);
        //获取地址
        $http.get(path + '/BuyerAddrController/saveBuyerAddr')
          .success(function(data){
            if ('success' === data.status) {
              $scope.addressGather = data.data;
            };
          })

        //删除地址
        $scope.remove = function(index) {
          if (confirm("确认删除？")) {
            $http.post(path + '/BuyerAddrController/delBuyerAddr', {params:{'id': index}})
              .success(function(data){
                if ('success' === data.status) {                
                  $scope.addressGather.splice(index, 1)
                };
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
    .controller('AddAddressCtrl', ['$scope', '$http', '$modalInstance', 'index',
      function($scope, $http, $modalInstance, index) {
        if (-1 === index) {
          $scope.title = "添加地址";
        } else {
          $scope.title = "修改地址";
        }
        console.log(index); 
        $scope.address = $scope.addressGather[index];
        type = (-1 === index) ? 1 : 0;
        $scope.submit = function(){
          $http.post(path + '/BuyerAddrController/saveBuyerAddr', {params:{'data':$scope.address, 'type':type}})
            .success(function(data){
              if ('success' === data.status) { 
                if (-1 === index) {
                  $scope.addressGather.push($scope.address);
                } else {
                  $scope.addressGather[index] = $scope.address
                }            
                alert('保存信息成功');
                $modalInstance.close();
              };
            })  
        }
        $scope.cancel = function(){
          $modalInstance.dismiss('cancel')
        }
      }
    ])
})