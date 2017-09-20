var assert = require('assert');

describe('Index page lists all headlines without explicit search', function() {

  beforeEach(function() {
    browser.url('/');
  });

  it("displays the headline fetcher title", function() {
    assert.equal(browser.getText('h1'), 'Headline Fetcher');
  });

  it("displays a headline when there are results", function () {
    assert.notEqual(browser.getText('.title'), null);
  });

  it("displays a summary when there are results", function () {
    assert.notEqual(browser.getText('.summary'), null);
  });

  it("displays an editorial when there are results and when there is an editorial", function () {
    assert.notEqual(browser.getText('.editorial'), null);
  });

});
