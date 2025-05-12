const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const callRecordsRoute = require("./Routes/Callrecords");
const registerRoute = require("./Routes/Register");
const loginRoute = require("./Routes/LoginPagee");
const packFormRoute = require("./Routes/packForm"); // ✅ NEW

const { connectToDb } = require("./Config/db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/call-records", callRecordsRoute);
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/pack-form", packFormRoute); // ✅ NEW

// DB Connect
connectToDb();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
