var express = require("express");
var router = express.Router();
const service = require("../service/sales-service");
const metrc = require("./helpers/MetrcFactory").getNew();
const saleService = new service(metrc);

/**
 * @swagger
 * /sales/customertypes:
 *   get:
 *     summary: Get a list of customer types
 *     description: Retrieve a list of customer types from the sales service.
 *     responses:
 *       200:
 *         description: A list of customer types
 */
router.get("/customertypes", async function (req, res, next) {
    try {
        const results = await saleService.getCustomerTypes();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

/**
 * @swagger
 * /sales/patientRegistrationLocation:
 *   get:
 *     summary: Get a list of patient registration locations
 *     description: Retrieve a list of patient registration locations from the sales service.
 *     responses:
 *       200:
 *         description: A list of patient registration locations
 */
router.get("/patientRegistrationLocation", async function (req, res, next) {
    try {
        const results = await saleService.getPatientRegistrationLocations();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

/**
 * @swagger
 * /sales/receipts:
 *   post:
 *     summary: Create sales receipts
 *     description: Create sales receipts using the provided payload.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *     responses:
 *       200:
 *         description: Sales receipts created successfully
 */
router.post("/receipts", async function (req, res, next) {
    try {
        const results = await saleService.createSalesReceipts(req.body); // Use req.body to pass the payload
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

module.exports = router;
