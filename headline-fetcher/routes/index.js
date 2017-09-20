var express = require('express');
var router = express.Router();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/* GET home page. */
router.get('/', function(req, res, next) {

  var httpRequest;
  var url = 'http://api.ft.com/content/search/v1';
  var apiKey = process.env.FT_API_KEY;
  var searchTerm = "";
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
  createRequest();

  // create and send xhr request
  function createRequest() {

    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleRequest;
    httpRequest.open('POST', url + '?apiKey=' + apiKey, true);
    httpRequest.send(JSON.stringify(params));
  }

  // handle request
  function handleRequest() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        updateSuccess(httpRequest.responseText);
      }
    }
  }

  function updateSuccess(responseText) {
    // parse response into JSON (from string)
    var response = JSON.parse(responseText);
    // Separate and render headlines
    var results = response.results[0].results;
    renderPage(results);
  }

  function renderPage(results) {

    var headlines = new Array();

    results.forEach(function(item) {
      var headline = {
         "title": item.title.title,
         "summary": item.summary.excerpt,
         "editorial": item.editorial.byline
      }
      headlines.push(headline);

    });
    res.render('index', { title: 'Headline Fetcher', headlines: headlines });
  }

});

module.exports = router;
