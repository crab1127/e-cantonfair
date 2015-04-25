require.config({
	urlArgs: '_=' + (new Date().getTime()),
	paths: {
		'angular' : '/components_module/angular/angular',
		'ui-route' : '/components_module/angular-ui-router/release/angular-ui-router',
		'domReady': '//cdn.staticfile.org/require-domReady/2.0.1/domReady.min',
		'animate' : '/components_module/angular-animate/angular-animate',
		//js
		'bootstrap': './bootstrap',
		'route': './route',
		'app': './app'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		'ui-route' : {
			deps: ['angular'],
			exports: 'ui-route'
		},
		'animate':{
			deps: ['angular'],
			exports: 'ngAnimate'
		},
		'angular-route': {
	      deps: ['angular']
	    },
	    app : {
	      exports: 'app',
	      deps: ['angular']
	    }
	},
	deps: ['bootstrap']
})
