var express = require("express");
var router = express.Router();
const service = require("../service/itemService");
const metrc = require("./helpers/MetrcFactory").getNew();
const serviceItems = new service(metrc);

/* GET Users listing. */
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
router.get("/users", function (req, res, next) {
  var jsonData = { message: "This is JSON data from your Express API" };
  res.json([{ name: "User 1" }, { name: "User 2" }]);
});

/* GET Categories listing. */
/**
 * @swagger
 * /items/categories:
 *   get:
 *     summary: Get a list of categories
 *     description: Retrieve a list of categories
 *     responses:
 *       200:
 *         description: A list of categories
 */
router.get("/categories", function (req, res, next) {
  serviceItems.categories().then((results) => {
    res.json(results);
  });
});

module.exports = router;
