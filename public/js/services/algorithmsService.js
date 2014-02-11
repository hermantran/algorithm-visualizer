define([
  'app',
  'algorithms'
], function(app, algorithms) {
  'use strict';
  app.service('algorithmsService', function() {
    this.runs = [];
    
    this.stats = algorithms.stats;
    
    this.setAfterAccess = function(func) {
      algorithms.afterAccess = func;
    };
    
    this.sort = function(algorithm, array) {
      var run = algorithms[algorithm](array),
          runCopy = {};
      
      runCopy.sort = algorithm;
      runCopy.runtime = addCommas(Math.round(run.runtime * 100) / 100);
      runCopy.size = array.length;
      runCopy.accesses = addCommas(run.accesses);
      runCopy.comparisons = addCommas(run.comparisons);
      this.runs.push(runCopy);
    };
    
    function addCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");  
    }
  });
});