define(['app', './menus'], function(app) {

  app.config(function($stateProvider, $urlRouterProvider, menus) {

    $urlRouterProvider.otherwise('/index');

    $stateProvider
      .state('index', {
        url: '/index',
        templateUrl: './view/index.html'
          //,controller: 'indexCtrl'
      })
      .state('module', {
        url: '/module',
        views: {
          '': {
            templateUrl: './view/module.html',
            controller: 'con'
          },
          'side@module': {
            templateUrl: './view/module.side.html'
          },
          'main@module': {
            templateUrl: './view/module.main.html'
          }
        },
        controller: function($scope, $state) {
          console.log($scope);
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: './view/about.html'
      })
      .state('dev-module', {
        url: '/dev-module',
        templateUrl: './view/dev-module.html'
      })
      .state('standard', {
        url: '/standard',
        templateUrl: './view/standard.html'
      })
      .state('css', {
        url: '/css',
        templateUrl: './view/css.html',
        controller: 'topagectrl'
      })

    //每个模块的路由设置
    angular.forEach(menus, function(menu, i) {
      $stateProvider.state('module.' + i, {
        url: '/' + i,
        views: {
          'main@module': {
            templateUrl: './view/module.main.html'
          }
        }
      })
      angular.forEach(menu, function(nav) {
        $stateProvider.state('module.' + i + '.' + nav.title, {
          url: '/' + nav.title,
          views: {
            'main@module': {
              templateUrl: function() {
                if (!nav.isFinish) {
                  alert('正在赶制改模块');
                  return './view/module.main.html'
                }
                return './view/component/' + nav.title + '/readme.html'
              },
            }
          }
        })
      });
    })
  });

  app.controller('MainCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    $scope.slide = '';
    $rootScope.switchs = function() {
      $scope.slide = 'switchs';
    }
  }]);

  app.controller('topagectrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    var ifm = document.getElementById("ifm");

    $scope.tolist = function(parmam) {
      console.log(parmam);
      ifm.onload = function() {
        console.log(ifm.contentDocument.body.offsetHeight);
        ifm.style.height = ifm.contentDocument.body.offsetHeight + 50 + "px";
      }
      var str='./view/css-component/'+parmam+'.html';
      $scope.src = str;
    }
  }]);

  app.controller('con', ['$scope', '$rootScope', 'menus', function($scope, $rootScope, menus) {
    //$http.get('./view/menu.json').success(function(data){
    $scope.menus = menus;
    //});
  }]);
  // .controller('indexCtrl', ['$scope', function($scope){

  // }]);

});