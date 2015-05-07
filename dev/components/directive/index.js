define(['angular', './hello','./uploader'], function(angular) {
	return angular.module('webapp.ui', [
		'webapp.ui.hello',
        'webapp.ui.uploader'
	])
})