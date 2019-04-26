var express = require('express');
var router = express.Router();
var apiRequest = require('../lib/apiRequest');

/* GET home page. */
router.get('/', function(req, res, next) {

  // Blank search term provided as empty string
  apiRequest.makeRequest('', renderHeadlines);

  function renderHeadlines(error, headlines) {
    if (error) {
      console.log(error);
      return res.status(500).send({ error: 'Oops, something went wrong' });
    }
    res.render('index', { title: 'Headline Fetcher', headlines: headlines });
  }

});

module.exports = router;
