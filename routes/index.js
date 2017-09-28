var express = require('express');
var router = express.Router();
var apiRequest = require('../lib/apiRequest');

/* GET home page. */
router.get('/', function(req, res, next) {

  apiRequest.makeRequest(renderHeadlines);

  function renderHeadlines(headlines) {
    res.render('index', { title: 'Headline Fetcher', headlines: headlines });
  }

});

module.exports = router;
