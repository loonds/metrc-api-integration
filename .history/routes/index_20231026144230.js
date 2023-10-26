var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var jsonData = { message: 'This is JSON data from your Express API' };

  // Send the JSON data as a response
  res.json(jsonData);
});

module.exports = router;
