const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Your API Documentation",
    version: "1.0.0",
    description: "API for your Express application",
  },
  servers: [
    {
      url: "http://localhost:3000", // Replace with your server URL
      description: "Local development server",
    },
  ],
};

module.exports = swaggerDefinition;
