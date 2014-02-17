require.config({
  baseUrl: 'js/',
  
  paths: {
    'angular': 'lib/angular.min',
    'angular.route': 'lib/angular-route.min',
    'algorithms': 'lib/algorithms.min',
    'prism': 'lib/prism',
    'd3': 'lib/d3.v3.min'
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
    },
    
    'd3': {
      exports: 'd3'  
    }
  }
});

define([
  'app',
  'routes/mainRoutes',
], function(app) {
  angular.bootstrap(document, ['visualizr']);
  document.getElementById('loader').style.display = 'none';
});