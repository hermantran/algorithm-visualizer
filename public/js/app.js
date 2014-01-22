define([
  'angular',
  'angular.route'
], function() {
  'use strict';
  return angular.module('visualizr', ['ngRoute'])
    .value('paths', paths);
});