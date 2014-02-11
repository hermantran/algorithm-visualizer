define([
  'app',
  'd3'
], function(app, d3) {
  'use strict';
  app.service('arrayService', function() {
    this.shuffle = d3.shuffle;
    
    this.randomArray = function(size) {
      var arr = [];
      for (var i = 1; i <= size; ++i) {
          arr.push(i);
      }
      return d3.shuffle(arr);
    };
    
    this.deepCopy = function(array) {
      return JSON.parse(JSON.stringify(array));  
    };
  });
});