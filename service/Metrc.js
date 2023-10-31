"use strict";

const axios = require("axios");

class Metrc {
  constructor(domain, licenseNumber, apiKey, userKey) {
    this._domain = domain;
    this._licenseNumber = licenseNumber;
    this._apiKey = apiKey;
    this._userKey = userKey;

    this._requestCount = 0;
    this._errorCount = 0;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(
        this._apiKey + ":" + this._userKey
      ).toString("base64")}`,
    };
  }

  async _handleError(error, response, responseBody) {
    this._errorCount++;

    const errorDetails = {
      message: "Metrc API request failed",
      requestHref: response?.request?.href,
      statusCode: response?.status,
      statusMessage: response?.statusText,
      responseBody,
    };

    console.error("Metrc API Error:", errorDetails);
    console.log("Total Requests:", this._requestCount);
    console.log("Total Errors:", this._errorCount);

    throw error;
  }

  async _parseResponse(response) {
    this._requestCount++;

    if (response.status >= 200 && response.status < 400) {
      return response.data;
    } else {
      const error = new Error("Metrc API request failed");
      this._handleError(error, response, response.data);
    }
  }

  async _request(method, path, body) {
    try {
      const response = await axios({
        method,
        url: `${this._domain}${path}?licenseNumber=${this._licenseNumber}`,
        headers: this._getHeaders(),
        data: body,
      });

      return this._parseResponse(response);
    } catch (error) {
      if (error.response) {
        this._handleError(error, error.response, error.response.data);
      } else {
        throw error;
      }
    }
  }

  async get(path, options) {
    return this._request("GET", path, options);
  }

  async post(path, body) {
    return this._request("POST", path, body);
  }

  async put(path, body) {
    return this._request("PUT", path, body);
  }

  async delete(path, body) {
    return this._request("DELETE", path, body);
  }
}

module.exports = Metrc;
