var express = require("express");
var router = express.Router();
const { getNew } = require('../config/metrc-factory-config');
const SaleService = require('../service/sales-service');

const metrc = getNew();
const saleService = new SaleService(metrc);


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
    const results = await saleService.createSalesReceipts(req.body);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

/**
 * @swagger
 * /sales/receipts/{receiptId}:
 *   put:
 *     summary: Update a sales receipt
 *     description: Update a sales receipt using the provided payload.
 *     parameters:
 *       - in: path
 *         name: receiptId
 *         description: ID of the sales receipt to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Sales receipt updated successfully
 */
router.get("/receipts/:receiptId", async function (req, res, next) {
  const receiptId = parseInt(req.params.receiptId);

  try {
    const getReceipt = await saleService.getSalesReceipts(receiptId);
    res.json(getReceipt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

/**
 * @swagger
 * /sales/receipts/{receiptId}:
 *   put:
 *     summary: Update a sales receipt
 *     description: Update a sales receipt using the provided payload.
 *     parameters:
 *       - in: path
 *         name: receiptId
 *         description: ID of the sales receipt to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Sales receipt updated successfully
 */
router.put("/receipts/:receiptId", async function (req, res, next) {
  const receiptId = parseInt(req.params.receiptId);
  const updatedData = req.body;

  try {
    const updatedReceipt = await saleService.updateSalesReceipt(
      receiptId,
      updatedData
    );
    res.json(updatedReceipt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

/**
 * @swagger
 * /sales/receipts/{receiptId}:
 *   delete:
 *     summary: Delete a sales receipt
 *     description: Delete a sales receipt by its ID.
 *     parameters:
 *       - in: path
 *         name: receiptId
 *         description: ID of the sales receipt to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Sales receipt deleted successfully
 */
router.delete("/receipts/:receiptId", async function (req, res, next) {
  const receiptId = parseInt(req.params.receiptId);

  try {
    await saleService.deleteSalesReceipt(receiptId);
    res.status(204).send();
  } catch (error) {
    console.error(error.s);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
