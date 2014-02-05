define([
  'app',
  'services/algorithms',
  'services/d3'
], function(app) {
  'use strict';
  app.controller('benchmarkCtrl', function($scope, algorithms, d3) {
    $scope.runs = algorithms.runs;
    $scope.size = 2000;
    $scope.maxSize = 50000;
    $scope.error = false;
    
    $scope.randomArray = function(size) {
      var arr = [];
      for (var i = 1; i <= size; ++i) {
          arr.push(i);
      }
      return d3.shuffle(arr);
    };
    
    $scope.clearRuns = function() {
      $scope.runs.length = 0;  
    };
    
    $scope.run = function(sort) {
      var size = parseInt($scope.size, 10),
          arr;
      
      if (size > 0 && size <= $scope.maxSize) {
        arr = $scope.randomArray(size);
        $scope.error = false;
        algorithms.sort(sort, arr);  
      } else {
        $scope.error = true;  
      }
    };
  });
});