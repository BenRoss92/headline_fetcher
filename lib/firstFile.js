// Run file in command line - `node lib/firstFile.js`

require('dotenv').config(); // Loads FT API Key from '.env' file in root of project
var request = require('request'); // Using 'request' package for AJAX requests - https://github.com/request/request

var url = 'http://api.ft.com/content/search/v1';
var apiKey = process.env.FT_API_KEY; // Get API key

var ApiRequest = function(searchTerm) {
  this.searchTerm = searchTerm;
  this.headlines = new Array();
  // Custom parameters for using search feature of FT API
  this.params = {
    "queryString": this.searchTerm,
    "queryContext": {
      "curations": ["ARTICLES"]
    },
    "resultContext" : {
      "aspects" : [ "title","lifecycle","location","summary","editorial" ],
      "maxResults" : "2",
      "offset" : "0"
    }
  }
  this.options = {
    method: 'post',
    body: this.params,
    json: true,
    url: url + '?apiKey=' + apiKey
  }

  this.makeRequest = function() {

    // Passing options property and callback function into `request` function from npm package
    request(this.options, callback);

    // Tried passing `returnBody` as a callback - not
    // - returning a TypeError: "returnBody is not a function"
    function callback(error, response, body, returnBody) {
      if (error) {
        console.error('error posting json: ', error);
        throw error;
      }

      // Works with console.log, i.e.:
      // console.log(body);
      // Wouldn't work with `return`, so tried using callback function below:
      returnBody(body);

    };

    // Return body of AJAX response - not returning anything
    // - want this to run after AJAX response body has been received
    function returnBody(results) {
      return results;
    }
  }

}

// Search for articles related to 'brexit'
var apiRequest = new ApiRequest("brexit");
// Attempting to return the response body
console.log(apiRequest.makeRequest());
