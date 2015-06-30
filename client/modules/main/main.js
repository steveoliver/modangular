angular.module('app.main', [])
  // Default Route
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/example');
  })
  .controller('MainCtrl', function($state, $scope) {
    $scope.state = $state;
  });
