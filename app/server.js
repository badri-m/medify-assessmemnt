const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "DevOps Assessment Application";

app.get("/", (req, res) => {
  res.json({
    message: APP_NAME,
    version: "1.0.0",
    hostname: require("os").hostname(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`${APP_NAME} running on port ${PORT}`);
});
