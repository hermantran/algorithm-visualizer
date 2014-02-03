define([
  'app',
  'services/algorithms'
], function(app) {
  'use strict';
  app.controller('mainCtrl', function($scope, algorithms) {
    $scope.stats = algorithms.stats;
    $scope.size = 100;
    $scope.error = false;
    
    $scope.run = function(sort) {
      var size = parseInt($scope.size, 10);
      
      if (size > 0 && size <= 10000) {
        $scope.error = false;
        algorithms.run(sort, $scope.size);  
      } else {
        $scope.error = true;  
      }
    };
  });
});