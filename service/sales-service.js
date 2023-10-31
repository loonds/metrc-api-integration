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

  async getSalesReceipts(receiptId){
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
          this._createEndpoint(`receipts/${receiptId}`),
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
}

module.exports = SalesService;
