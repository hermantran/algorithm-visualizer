define([
  'app',
  'algorithms'
], function(app, algorithms) {
  app.service('algorithms', function() {
    this.runs = [];
    
    this.sort = function(algorithm, array) {
      var run = algorithms[algorithm](array),
          runCopy = JSON.parse(JSON.stringify(run));
      
      runCopy.runtime = Math.round(run.runtime * 1000) / 1000.0;
      runCopy.sort = algorithm;
      runCopy.size = array.length;
      this.runs.push(JSON.parse(JSON.stringify(runCopy)));
    };
  });
});