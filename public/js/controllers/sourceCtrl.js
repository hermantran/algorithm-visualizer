define([
  'app',
  'services/prismService'
], function(app) {
  'use strict';
  app.controller('sourceCtrl', function($scope, prismService) {
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
      prismService.highlightAll();
    };
    
    $scope.init(1);
  });
});