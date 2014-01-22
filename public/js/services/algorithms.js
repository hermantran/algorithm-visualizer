define([
  'app',
  'algorithms'
], function(app, algorithms) {
  app.service('algorithms', function() {
    this.stats = algorithms.stats;

    function randomArray(len) {
      var arr = [];
      
      for (var i = 0; i < len; i++) {
        arr.push(Math.round(Math.random() * len));    
      }
      
      return arr;
    }
    
    this.run = function(algorithm, elements) {
      algorithms[algorithm](randomArray(elements));  
    }
  });
});