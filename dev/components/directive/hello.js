define(['angular'], function(angular){
	angular.module('webapp.ui.hello', [])
	.directive('hello', function() {
		return {
			restrict: 'E',
			template: '<div>my name world</div>', 
			replace: true
		};
	});
})