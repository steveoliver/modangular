angular.module('app.example', [])
  .config(function($stateProvider) {
    $stateProvider.state('example', {
      url: '/example',
      templateUrl: 'example/views/example.html',
      controller: 'ExampleDefaultCtrl'
    });
  })
  .controller('ExampleDefaultCtrl', function($scope) {
    $scope.headerText = 'Example';
  });
