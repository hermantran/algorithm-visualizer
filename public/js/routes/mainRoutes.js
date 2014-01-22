define([
  'app',
  'controllers/mainCtrl'
], function(app) {
  'use strict';
  return app.config(['$routeProvider', function($routeProvider) {
    var main = { 
        controller: 'mainCtrl', 
        templateUrl: paths.base + '/js/templates/main.html' 
    };
    
    $routeProvider
      .when('/', main)
      .when('/!', main);
  }]);
});