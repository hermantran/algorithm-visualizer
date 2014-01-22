require.config({
  baseUrl: 'js/',
  
  paths: {
    'angular': 'lib/angular.min',
    'angular.route': 'lib/angular-route.min',
    'algorithms': 'lib/algorithms.min'
  },
  
  shim: {
     'angular': {
      exports: 'angular'  
    },
    
    'angular.route': {
      deps: ['angular'],
      exports: 'angular'
    }
  }
});

define([
  'app',
  'routes/mainRoutes'
], function() {
  angular.bootstrap(document, ['visualizr']);
});