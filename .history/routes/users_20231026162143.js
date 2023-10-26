var express = require('express');
var router = express.Router();

/* GET users listing. */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of user records
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/', function(req, res, next) {
  var jsonData = { message: 'This is JSON data from your Express API' };
  res.json([{ name: 'User 1' }, { name: 'User 2' }]);
  // res.json(jsonData);
});

module.exports = router;
