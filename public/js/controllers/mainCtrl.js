define([
  'app',
  'services/algorithms'
], function(app) {
  'use strict';
  app.controller('mainCtrl', function($scope, algorithms) {
    $scope.stats = algorithms.stats;
    $scope.run = function(sort) {
      algorithms.run(sort, $scope.elements);  
    };
    
    $scope.$watchCollection('stats', function() {
      console.log($scope.stats);
    });
  });
});