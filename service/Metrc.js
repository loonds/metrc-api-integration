"use strict";

const axios = require("axios");
const moment = require("moment");

class Metrc {
  constructor(domain, licenseNumber, apiKey, userKey) {
    this._domain = domain;
    this._licenseNumber = licenseNumber;
    this._apiKey = apiKey;
    this._userKey = userKey;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(this._apiKey + ":" + this._userKey).toString("base64")}`,
    };
  }

  _handleError(err, res, body) {
    const error = new Error("Metrc API request failed");
    error.requestHref = res?.request?.href;
    error.statusCode = res?.status;
    console.log('error is here ', error)
    error.statusMessage = res?.statusText;
    error.responseBody = body;
    throw error;
  }

  _parseResponse(response) {
    if (response.status >= 200 && response.status < 400) {
      return response.data;
    } else {
      this._handleError(null, response, response.data);
    }
  }

  async _request(method, path, body) {
    try {
      const response = await axios({
        method: method,
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
