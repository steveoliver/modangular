describe('TestExampleController', function () {

  var title = element(by.id('example-title'));

  beforeEach(function() {
    browser.get('http://127.0.0.1:8888/#/example');
  });

  it('initially has the example controller title', function () {
    expect(title.getText()).toEqual('Example');
  });

});
