define([
  'app',
  'prism'
], function(app, prism) {
  'use strict';
  app.service('prismService', function() {
    return prism;
  });
});