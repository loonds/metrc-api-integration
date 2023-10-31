const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = require("./swaggerDef");

const app = express();
const port = process.env.PORT || 3000;

const options = {
  definition: swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
