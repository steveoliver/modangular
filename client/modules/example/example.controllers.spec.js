describe('ExampleCtrl', function() {

  var controller = null;
  $scope = null;

  beforeEach(function () {
    module('app');
  });

  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    controller = $controller('ExampleDefaultCtrl', {
      $scope: $scope
    });
  }));

  it('Example default controller header text shows up', function() {
    assert.equal($scope.headerText, "ExampleDefaultCtrl");
  });

});

