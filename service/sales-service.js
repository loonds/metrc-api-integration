"use strict";

const PathMaker = require("../util/PathMaker");

class SalesService {
  constructor(metrc) {
    this._metrc = metrc;
    this._pathMaker = new PathMaker("/sales/v2/");
    this._salesReceipts = [];
    this._createdDelivery = null;
  }

  _createEndpoint(ending) {
    return this._pathMaker.endpoint(ending);
  }

  async _handleResponse(promise) {
    try {
      const data = await promise;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getCustomerTypes() {
    const response = await this._handleResponse(
      this._metrc.get(this._createEndpoint("customertypes"))
    );

    if (response.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: "Failed to fetch customer types" };
    }
  }

  async getPatientRegistrationLocations() {
    const response = await this._handleResponse(
      this._metrc.get(this._createEndpoint("patientregistration/locations"))
    );

    if (response.success) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        error: "Failed to fetch patient registration locations",
      };
    }
  }

  async createSalesReceipts(payload) {
    if (!Array.isArray(payload)) {
      return { success: false, error: "Invalid payload format" };
    }

    const createdReceipts = [];
    for (const data of payload) {
      const newReceipt = {
        id: this._salesReceipts.length + 1,
        ...data,
      };
      this._salesReceipts.push(newReceipt);
      const response = await this._handleResponse(
        this._metrc.post(this._createEndpoint("receipts"), data)
      );
      if (!response.success) return response;
      createdReceipts.push(newReceipt);
    }

    return { success: true, data: createdReceipts };
  }

  async updateSalesReceipt(receiptId, updatedData) {
    const index = this._salesReceipts.findIndex(
      (receipt) => receipt.id === receiptId
    );
    if (index === -1) {
      return { success: false, error: "Receipt not found" };
    }

    this._salesReceipts[index] = {
      ...this._salesReceipts[index],
      ...updatedData,
    };

    const response = await this._handleResponse(
      this._metrc.put(
        this._createEndpoint(`receipts/${receiptId}`),
        updatedData
      )
    );

    return response;
  }

  async deleteSalesReceipt(receiptId) {
    const index = this._salesReceipts.findIndex(
      (receipt) => receipt.id === receiptId
    );
    if (index === -1) {
      return { success: false, error: "Receipt not found" };
    }

    this._salesReceipts.splice(index, 1);

    const response = await this._handleResponse(
      this._metrc.delete(this._createEndpoint(`receipts/${receiptId}`))
    );

    return response;
  }

  async createHomeDelivery(customerType, transactions) {
    const deliveryPayload = {
      SalesCustomerType: customerType,
      Transactions: transactions,
    };

    const response = await this._handleResponse(
      this._metrc.post(this._createEndpoint("delivery"), deliveryPayload)
    );

    if (response.success) {
      this._createdDelivery = response.data;
    }

    return response;
  }

  async removeTransactionFromDelivery(transactionId) {
    if (!this._createdDelivery) {
      return {
        success: false,
        error: "Delivery not found. You must create a delivery first.",
      };
    }

    this._createdDelivery.Transactions =
      this._createdDelivery.Transactions.filter(
        (transaction) => transaction.Id !== transactionId
      );

    const response = await this._handleResponse(
      this._metrc.put(
        this._createEndpoint(`delivery/${this._createdDelivery.Id}`),
        this._createdDelivery
      )
    );

    return response;
  }

  async completeHomeDelivery(acceptedPackage, returnedPackage) {
    if (!this._createdDelivery) {
      return {
        success: false,
        error: "Delivery not found. You must create a delivery first.",
      };
    }

    const deliveryCompletePayload = {
      Delivery: this._createdDelivery,
      AcceptedPackage,
      ReturnedPackage,
    };

    return this._handleResponse(
      this._metrc.put(
        this._createEndpoint("deliveries/complete"),
        deliveryCompletePayload
      )
    );
  }
}

module.exports = SalesService;
