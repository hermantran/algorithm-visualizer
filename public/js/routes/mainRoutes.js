define([
  'app',
  'controllers/visualizationCtrl',
  'controllers/benchmarkCtrl',
  'controllers/sourceCtrl'
], function(app) {
  'use strict';
  return app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/visualization', {
        controller: 'visualizationCtrl',
        templateUrl: '/partials/visualization'
      })
      .when('/benchmarking', { 
        controller: 'benchmarkCtrl', 
        templateUrl: '/partials/benchmarking' 
      })
      .when('/source', {
        controller: 'sourceCtrl',
        templateUrl: '/partials/source'
      })
      .otherwise({
        redirectTo: '/benchmarking'
      });
  }]);
});