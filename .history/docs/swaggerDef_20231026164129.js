const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Metrc Rest-api Integration",
      version: "1.0.0",
      description:
        "Simplify METRC (Marijuana Enforcement Tracking Reporting Compliance) integration with this Node.js-based connector. Manage inventory, sales, and compliance effortlessly with this versatile library",
      contact: {
        // Add author name and website
        name: "Your Name",
        url: "https://www.yourwebsite.com",
      },
    },
  },
  apis: ["./routes/*.js"], // Your API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
