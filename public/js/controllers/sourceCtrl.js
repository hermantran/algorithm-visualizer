define([
  'app',
  'services/prism'
], function(app) {
  'use strict';
  app.controller('sourceCtrl', function($scope, prism) {
    $scope.active = 0;
    
    $scope.setActive = function(index) {
      $scope.active = parseInt(index, 10);
    };
    
    $scope.isActive = function(index) {
      if ($scope.active === index) {
        return true; 
      }
      
      return false;
    };
    
    $scope.init = function(index) {
      $scope.active = index;
      prism.highlightAll();
    };
    
    $scope.init(1);
  });
});