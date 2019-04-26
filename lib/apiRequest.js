require('dotenv').config(); // Loads FT API Key from '.env' file in root of project
var request = require('request'); // Using 'request' package for AJAX requests - https://github.com/request/request

// Didn't use default parameters - reason:
  // Parameters are still set left-to-right,
  // overwriting default parameters
  // even if there are later parameters without defaults.
  // Therefore search term needs to be last argument otherwise callback will be undefined.
function makeRequest(searchTerm, callback) {

  var url = 'http://api.ft.com/content/search/v1';
  var apiKey = process.env.FT_API_KEY; // Get API key

  var params = {
    "queryString": searchTerm,
    "queryContext": {
      "curations": ["ARTICLES"]
    },
    "resultContext" : {
      "aspects" : [ "title","lifecycle","location","summary","editorial" ],
      "maxResults" : "2",
      "offset" : "0"
    }
  }

  var options = {
    method: 'post',
    body: params,
    json: true,
    url: url + '?apiKey=' + apiKey
  }

  request(options, function(error, response, body) {
    if (error) {
      return callback(error, null);
    }
    return filterHeadlines(body);
  });

  function filterHeadlines(apiResponse) {
    var headlines = new Array();
    var headlineData = apiResponse.results[0].results;

    headlineData.forEach(function(headline) {
      headline = {
        "title": headline.title.title,
        "summary": headline.summary.excerpt,
        "editorial": headline.editorial.byline
      }
      headlines.push(headline);
    });

    return callback(null, headlines);
  }

}

module.exports = {
  makeRequest
}
