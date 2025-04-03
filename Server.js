const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const callRecordsRoute = require("./Routes/Callrecords");
const registerRoute = require("./Routes/Register");
const loginRoute = require("./Routes/LoginPagee");
const { connectToDb } = require("./Config/db");

const app = express();

// Enhanced Middleware
app.use(cors());
app.use(bodyParser.json());

// Existing Routes
app.use("/api/call-records", callRecordsRoute);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);

// Database Connection
connectToDb();

// Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});