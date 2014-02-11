define([
  'app',
  'services/barChartService',
  'services/algorithmsService',
  'services/arrayService'
], function(app) {
  'use strict';
  app.controller('visualizationCtrl', function($scope, barChartService, algorithmsService, arrayService) {
    $scope.arraySize = 50;
    
    $scope.reset = function() {
      barChartService.reset($scope.dataset);
    };
    
    $scope.shuffle = function() {
      $scope.dataset = arrayService.randomArray($scope.arraySize);
      barChartService.reset($scope.dataset);
    };
      
    $scope.animate = function(sort) {
      barChartService.clearTransitions();
      algorithmsService.sort(sort, arrayService.deepCopy($scope.dataset));  
      barChartService.runTransitions();
    };
    
    $scope.init = function() {
      algorithmsService.setAfterAccess(function(array) {
        barChartService.addTransition({
          dataset: array,
          stats: algorithmsService.stats
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