require.config({
  baseUrl: 'js/',
  
  paths: {
    'angular': 'lib/angular.min',
    'angular.route': 'lib/angular-route.min',
    'algorithms': 'lib/algorithms.min',
    'prism': 'lib/prism'
  },
  
  shim: {
     'angular': {
      exports: 'angular'  
    },
    
    'angular.route': {
      deps: ['angular'],
      exports: 'angular'
    },
    
    'prism': {
      exports: 'Prism'  
    }
  }
});

define([
  'prism',
  'app',
  'routes/mainRoutes',
], function(prism) {
  prism.highlightAll();
  angular.bootstrap(document, ['visualizr']);
});