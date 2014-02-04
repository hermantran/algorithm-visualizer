define([
  'app',
  'prism'
], function(app, prism) {
  app.service('prism', function() {
    return prism;
  });
});