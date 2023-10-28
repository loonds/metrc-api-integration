"use strict";

const PathMaker = require("../util/PathMaker");

class SalesService {
  constructor(metrc) {
    this._metrc = metrc;
    this._pathMaker = new PathMaker("/sales/v2/");
    this._salesReceipts = []; // Simulated in-memory storage for sales receipts
  }

  _createEndpoint(ending) {
    return this._pathMaker.endpoint(ending);
  }

  async getCustomerTypes() {
    return await this._metrc.get(this._createEndpoint("customertypes"));
  }

  async getPatientRegistrationLocations() {
    return await this._metrc.get(this._createEndpoint("patientregistration/locations"));
  }

  async createSalesReceipts(payload) {
    try {
     
  
      if (!Array.isArray(payload)) {
        throw new Error("Invalid payload format");
      }
  
      // Simulate creating new sales receipts for each entry in the payload
      const createdReceipts = [];
      for (const data of payload) {
        const newReceipt = {
          id: this._salesReceipts.length + 1,
          ...data,
        };
        this._salesReceipts.push(newReceipt);
        const createdReceipt = await this._metrc.post(this._createEndpoint("receipts"), data);
        createdReceipts.push(newReceipt);
      }
  
      return createdReceipts;
    } catch (error) {
      if (error.response) {
        // Log the response data when there's an error
        console.error("Response Data:", error.response.data);
      }
      throw error; // Re-throw the error for further handling
    }
  }
}

module.exports = SalesService;
