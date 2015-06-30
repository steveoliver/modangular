angular.module('app.util', [])
  // Make lodash available for injection
  .factory('_', ['$window',  function($window) {
    return $window._;
  }]);
