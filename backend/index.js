// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const db = require("./models");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Import routes
const certificatesRouter = require("./routes/certificates");
const userRouter = require("./routes/users");
const issuerRouter = require("./routes/issuers");

// Use routes
app.use("/api/certificates", certificatesRouter);
app.use("/api/user", userRouter);
app.use("/api/issuer", issuerRouter);

// Sync DB and start server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
});
