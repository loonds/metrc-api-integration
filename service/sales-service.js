"use strict";

const PathMaker = require("../util/PathMaker");

class SalesService {
  constructor(metrc) {
    this._metrc = metrc;
    this._pathMaker = new PathMaker("/sales/v2/");
    this._salesReceipts = [];
  }

  _createEndpoint(ending) {
    return this._pathMaker.endpoint(ending);
  }

  async getCustomerTypes() {
    return await this._metrc.get(this._createEndpoint("customertypes"));
  }

  async getPatientRegistrationLocations() {
    return await this._metrc.get(
      this._createEndpoint("patientregistration/locations")
    );
  }

  async getSalesReceipts(receiptId) {
    return await this._metrc.get(this._createEndpoint(`receipts/${receiptId}`));
  }

  async createSalesReceipts(payload) {
    try {
      if (!Array.isArray(payload)) {
        throw new Error("Invalid payload format");
      }

      const createdReceipts = [];
      for (const data of payload) {
        const newReceipt = {
          id: this._salesReceipts.length + 1,
          ...data,
        };
        this._salesReceipts.push(newReceipt);
        const createdReceipt = await this._metrc.post(
          this._createEndpoint(`receipts`),
          data
        );
        createdReceipts.push(newReceipt);
      }

      return createdReceipts;
    } catch (error) {
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
      throw error;
    }
  }

  async updateSalesReceipt(receiptId, updatedData) {
    try {
      const index = this._salesReceipts.findIndex(
        (receipt) => receipt.id === receiptId
      );
      if (index === -1) {
        throw new Error("Receipt not found");
      }

      this._salesReceipts[index] = {
        ...this._salesReceipts[index],
        ...updatedData,
      };

      const updatedReceipt = await this._metrc.put(
        this._createEndpoint(`receipts/${receiptId}`),
        updatedData
      );

      return updatedReceipt;
    } catch (error) {
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
      throw error;
    }
  }

  async deleteSalesReceipt(receiptId) {
    try {
      const index = this._salesReceipts.findIndex(
        (receipt) => receipt.id === receiptId
      );
      if (index === -1) {
        throw new Error("Receipt not found");
      }

      this._salesReceipts.splice(index, 1);

      await this._metrc.delete(this._createEndpoint(`receipts/${receiptId}`));
    } catch (error) {
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
      throw error;
    }
  }

  async createHomeDelivery(customerType, transactions) {
    try {
      const deliveryPayload = {
        SalesCustomerType: customerType,
        Transactions: transactions,
      };

      // Create the home delivery
      const createdDelivery = await this._metrc.post(
        this._createEndpoint("delivery"),
        deliveryPayload
      );

      // Store the created delivery for later steps
      this._createdDelivery = createdDelivery;

      return createdDelivery;
    } catch (error) {
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
      throw error;
    }
  }

  async removeTransactionFromDelivery(transactionId) {
    try {
      if (!this._createdDelivery) {
        throw new Error(
          "Delivery not found. You must create a delivery first."
        );
      }

      // Remove one transaction from the delivery
      this._createdDelivery.Transactions =
        this._createdDelivery.Transactions.filter(
          (transaction) => transaction.Id !== transactionId
        );

      await this._metrc.put(
        this._createEndpoint(`delivery/${this._createdDelivery.Id}`),
        this._createdDelivery
      );

      return this._createdDelivery;
    } catch (error) {
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
      throw error;
    }
  }

  async completeHomeDelivery(acceptedPackage, returnedPackage) {
    try {
      if (!this._createdDelivery) {
        throw new Error(
          "Delivery not found. You must create a delivery first."
        );
      }

      // Complete the home delivery with AcceptedPackage and ReturnedPackage
      const deliveryCompletePayload = {
        Delivery: this._createdDelivery,
        AcceptedPackage,
        ReturnedPackage,
      };

      const completedDelivery = await this._metrc.put(
        this._createEndpoint(`deliveries/complete`),
        deliveryCompletePayload
      );

      return completedDelivery;
    } catch (error) {
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
      throw error;
    }
  }
}

module.exports = SalesService;
