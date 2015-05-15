define(['./module'], function(ng){

  ng
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('TokenInterceptor');
    })
    .controller('MainCtrl', [
      '$scope', '$rootScope', '$location', '$state', 'menus', 'userService', 
      function($scope, $rootScope,$location,$state, menus, userinfo){

        $rootScope.isLogin = userinfo.isLogin;

        $rootScope.userInfo = userinfo;
        console.log($rootScope.userInfo);
        if (!$rootScope.isLogin) {
          $location.path('/login');          
        }

        $scope.menus = menus;

        $scope.logout = function(){
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          $location.path('/login');
        }



    }])
    .run(function($rootScope, $location, $state, $window, userService){

      //监听路由， 路由上的依权限访问
      //bug： 有时不执行 $location.path("/login") 语句， 以修复
      $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){

        if(toState.name=='login') return;// 如果是进入登录界面则允许

        // 如果用户不存在
        if(!$rootScope.isLogin){
          event.preventDefault();// 取消默认跳转行为
          $state.go("login");//跳转到登录界面
        }
      });
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
    })
    .filter('parseIn', function(){
      return function(str) {
        if (typeof str === 'number'){
          return str
        } else {
          return parseInt(str, 10);
        }
      }
    })
});
