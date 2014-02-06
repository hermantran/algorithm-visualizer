define([
  'app',
  'services/d3',
  'services/algorithms'
], function(app) {
  'use strict';
  app.controller('visualizationCtrl', function($scope, d3, algorithms) {
    $scope.randomArray = function(size) {
      var arr = [];
      for (var i = 1; i <= size; ++i) {
          arr.push(i);
      }
      return d3.shuffle(arr);
    };
    
    $scope.reset = function() {
      $scope.dataset = $scope.randomArray(50);
      d3.reset($scope.dataset);
    };
      
    $scope.animate = function(sort) {
      d3.clearTransitions();
      algorithms.sort(sort, $scope.dataset);  
      d3.runTransitions();
    };
    
    algorithms.setAfterAccess(function(array) {
      d3.addTransition({
        dataset: array,
        stats: algorithms.stats
      });  
    });
    
    $scope.dataset = $scope.randomArray(50);
    $scope.stats = algorithms.stats;
    
    d3.barChart({
      el: '#chart',
      width: 1000,
      height: 400,
      dataset: $scope.dataset,
      stats: $scope.stats
    });
  });
});