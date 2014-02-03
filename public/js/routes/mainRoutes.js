define([
  'app',
  'controllers/mainCtrl'
], function(app) {
  'use strict';
  return app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', { 
        controller: 'mainCtrl', 
        templateUrl: '/partials/main' 
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
});