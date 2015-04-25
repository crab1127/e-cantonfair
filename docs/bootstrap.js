define(['require',
        'angular',
        'animate',
        'ui-route',
        'app', 
        'route'
       ],function(require,angular){
            'use strict';
            require(['domReady!'],function(document){
                angular.bootstrap(document,['webapp']);
            });
        });