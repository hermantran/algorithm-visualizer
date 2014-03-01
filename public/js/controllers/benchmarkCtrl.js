define([
  'app',
  'services/algorithmsService',
  'services/arrayService'
], function(app) {
  'use strict';
  app.controller('benchmarkCtrl', function($scope, algorithmsService, arrayService) {
    $scope.runs = algorithmsService.runs;
    $scope.size = 2000;
    $scope.maxSize = 50000;
    $scope.error = false;
    
    $scope.init = function() {
      algorithmsService.setAfterSwap(angular.noop);
    };

    $scope.clearRuns = function() {
      $scope.runs.length = 0;  
    };
    
    $scope.run = function(sort) {
      var size = parseInt($scope.size, 10),
          arr;
      
      if (size > 0 && size <= $scope.maxSize) {
        arr = arrayService.randomArray(size);
        $scope.error = false;
        algorithmsService.sort(sort, arr);  
      } else {
        $scope.error = true;  
      }
    };
    
    $scope.init();
  });
});