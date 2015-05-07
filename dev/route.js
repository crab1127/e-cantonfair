define(['app', './menus'], function(app){ 

  app.config(function($stateProvider, $urlRouterProvider, menus) {

    $urlRouterProvider.otherwise('/index');

    $stateProvider
      //首页
      .state('index', {
        url: '/index',
        templateUrl: './components/controller/index/index.html'
      })
      //登入
      .state('login', {
        url: '/login',
        templateUrl: './components/controller/login/login.html',
        controller: 'loginCtrl'
      })
      //设置页
      .state('set', {
        url: '/set',
        views: {
          '': {
            templateUrl: './view/template/layout.html'
          },
          'side@set' : {
            templateUrl: './view/template/menu.html'
          },
          'main@set': {
            templateUrl : './components/controller/set/index.html',
            controller: 'SetCtrl'
          }
        }
      })
      //卖家申请
      .state('applySeller', {
        url: '/applySeller',
        views: {
          '': {
            templateUrl: './view/template/layout.html'
          },
          'side@set' : {
            templateUrl: './view/template/menu.html'
          },
          'main@set': {
            templateUrl : './components/controller/applySeller/index.html'
          }
        }
      })
      //商品
      .state('goods', {
        url: '/goods',
        views: {
          '': {
            templateUrl: './view/template/layout.html'
          },
          'side@set' : {
            templateUrl: './view/template/menu.html'
          },
          'main@set': {
            templateUrl : './components/controller/goods/index.html'
          }
        }
      });
    
    angular.forEach(menus, function(menu){
      //设置子分类
      if ('set' === menu.path) {
        angular.forEach(menu.items, function(nav){
          $stateProvider.state('set.' + nav.path, {
            url: '/' + nav.path,
            views: {              
              'main@set': {
                templateUrl : './components/controller/'+ nav.template,
                controller: nav.controller
              }
            }
          })
        })
        angular.forEach(menu.hideItems, function(nav){
          $stateProvider.state('set.' + nav.path, {
            url: '/' + nav.path,
            views: {              
              'main@set': {
                templateUrl : './components/controller/'+ nav.template,
                controller: nav.controller
              }
            }
          })
        })
      }
      //商品子分类
      if ('goods' === menu.path) {
        angular.forEach(menu.items, function(nav){
          $stateProvider.state('set.' + nav.path, {
            url: '/' + nav.path,
            views: {              
              'main@goods': {
                templateUrl : './components/controller/'+ nav.template
              }
            }
          })
        })
      }
    })

  })

});