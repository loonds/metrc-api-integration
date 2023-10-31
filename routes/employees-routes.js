var express = require("express");
var router = express.Router();
const service = require("../service/employees-service");
const metrc = require("../config/metrc-factory-config").getNew();
const employeesService = new service(metrc);



/* GET employees listing. */
/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get a list of employees
 *     description: Retrieve a list of employees
 *     responses:
 *       200:
 *         description: A list of employees
 */
router.get("/", function (req, res, next) {
  employeesService
    .employees()
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.error("Error in employees route:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
