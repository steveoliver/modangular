describe('TestExampleController', function () {

  var title = element(by.id('example-title'));

  beforeEach(function() {
    browser.get('http://localhost:3000/#/example');
  });

  it('initially has the example controller title', function () {
    expect(title.getText()).toEqual('Example');
  });

});
