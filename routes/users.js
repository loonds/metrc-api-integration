var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var jsonData = { message: 'This is JSON data from your Express API' };

  res.json(jsonData);
});

module.exports = router;
