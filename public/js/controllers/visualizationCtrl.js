define([
  'app',
  'services/barChartService',
  'services/algorithmsService',
  'services/arrayService'
], function(app) {
  'use strict';
  app.controller('visualizationCtrl', function($scope, barChartService, algorithmsService, arrayService) {
    $scope.arraySize = 50;
    $scope.maxSize = 100;
    $scope.error = false;
    
    $scope.reset = function() {
      barChartService.reset($scope.dataset);
    };
    
    $scope.shuffle = function() {
      $scope.dataset = arrayService.randomArray($scope.arraySize);
      barChartService.reset($scope.dataset);
    };
      
    $scope.animate = function(sort) {
      var size = parseInt($scope.arraySize, 10);
      
      if (size > 0 && size <= $scope.maxSize) {
        $scope.error = false;
        $scope.dataset = arrayService.randomArray($scope.arraySize);
        barChartService.drawBars($scope.dataset);
        barChartService.clearTransitions();
        algorithmsService.sort(sort, $scope.dataset.slice(0));  
        barChartService.runTransitions(); 
      } else {
        $scope.error = true;  
      }
    };
    
    $scope.init = function() {
      algorithmsService.setAfterSwap(function(array, first, second) {
        barChartService.addTransition({
          dataset: array,
          stats: algorithmsService.stats,
          pairs: [first, second]
        });  
      });
      
      $scope.dataset = arrayService.randomArray($scope.arraySize);
      $scope.stats = algorithmsService.stats;
      
      barChartService.barChart({
        el: '#chart',
        width: 1000,
        height: 400,
        dataset: $scope.dataset,
        stats: $scope.stats
      });
    };
    
    $scope.init();
  });
});