define(['./module'], function(ng){

  ng
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('TokenInterceptor');
    })
    .controller('MainCtrl', [
      '$scope', '$rootScope', '$location', 'menus', 'userService', 
      function($scope, $rootScope,$location, menus, userinfo){

        $rootScope.isLogin = userinfo.isLogin;
        $rootScope.userInfo = userinfo.data;

        if (!$rootScope.isLogin) {
          $location.path('/login');          
        }

        $scope.menus = menus;
        
      console.log($rootScope);
      //监听url，
      // $rootScope.$on('routeChangeSuccess', function () {
      //   console.log(222);
      //   if ($rootScope.isLogin) {
      //     $location.path('/login');
      //   }
      // });

      // $rootScope.$on('$stateChangeStart', function(event, next, current){
      //   console.log(next.$$rout);
      //   console.log(1);
      //   if ($rootScope.isLogin) {
      //     console.log(2);
      //     console.log(current);
      //     $location.path('/login');
      //   }
      // }); 

    }])
    .run(function($rootScope, $location, $window, userService){

      //监听路由， 路由上的依权限访问
      //bug： 有时不执行 $location.path("/login") 语句
      $rootScope.$on('$stateChangeStart', function(event, nextRoute, currentRouter){ 
        //未登入时， 都调转到登入页 
        if (!userService.isLogin) {
          $location.path("/login");
        };

        //登录后根据用户权限来弄
        //没有权限的模块都跳转到首页
        if(0) {
          $location.path("/index");
        }
      })
    })
    .factory('TokenInterceptor', function ($q, $window, $location, userService) {
      return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.localStorage.isLogin) {
                config.headers.Authorization = 'Bearer ' + $window.localStorage.isLogin;
            }
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        /* Set Authentication.isLogin to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $window.localStorage.isLogin && !userService.isLogin) {
                userService.isLogin = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.localStorage.isLogin || userService.isLogin)) {
                delete $window.localStorage.isLogin;
                userService.isLogin = false;
                $location.path("/login");
            }

            return $q.reject(rejection);
        }
      };
    });
});
