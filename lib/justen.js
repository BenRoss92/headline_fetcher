require('dotenv').config(); // Loads FT API Key from '.env' file in root of project
var request = require('request'); // Using 'request' package for AJAX requests - https://github.com/request/request

var logger = require('./logger.js');
var url = 'http://api.ft.com/content/search/v1';
var apiKey = process.env.FT_API_KEY; // Get API key

function makeRequest(searchTerm, callback) {
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

  request(options, function(err, res, body) {
    if (err) throw err;
    return callback(body);
  });
}

// the callback in this case is logger but really it can be any function
// eg. res.send to return the response to the front-end
makeRequest('brexit', logger);
