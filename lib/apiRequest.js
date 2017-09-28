require('dotenv').config(); // Loads FT API Key from '.env' file in root of project
var request = require('request'); // Using 'request' package for AJAX requests - https://github.com/request/request

function makeRequest(callback, searchTerm="") {

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
      throw error;
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

    return callback(headlines);
  }

}

module.exports = {
  makeRequest
}
