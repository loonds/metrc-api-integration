var express = require("express");
var router = express.Router();
const service = require("../service/item-service");
const metrc = require("../config/metrc-factory-config").getNew();
const serviceItems = new service(metrc);


/**
 * @swagger
 * /items/active:
 *   get:
 *     summary: Get a list of active categories
 *     description: Retrieve a list of active categories
 *     responses:
 *       200:
 *         description: A list of active categories
 */
router.get("/active", function (req, res, next) {
  serviceItems.active().then((results) => {
    res.json(results);
  });
});

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
