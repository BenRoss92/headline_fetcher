var assert = require('assert');

describe('index page', function() {
  it("displays the headline fetcher title", function () {
    browser.url('/');
    assert.equal(browser.getText('h1'), 'Headline Fetcher');
  });
});
