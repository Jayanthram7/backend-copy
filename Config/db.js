const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const dbURI = process.env.MONGO_URI || "mongodb+srv://jayanthramnithin:jrnk72004nithu@cluster0.lttav.mongodb.net/callRecordsDB?retryWrites=true&w=majority&appName=Cluster0"
    ;
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = { connectToDb };
