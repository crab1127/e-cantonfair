define(['app'], function(app){
	app.controller('IndexCtrl', ['$scope','$injector', function($scope, $injector){
        require(['./components/controller/index/index.js'], function(login){
    		$injector.invoke(login, this, {'$scope': $scope});
    	})
    }]);
    app.controller('loginCtrl', ['$scope','$injector', function($scope, $injector){
    	require(['./components/controller/login/login.js'], function(login){
    		$injector.invoke(login, this, {'$scope': $scope});
    	})
        
    }]);
});