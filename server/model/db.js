const Rollbar = require("rollbar");
const rollbar = new Rollbar("1be8fa92af464d6abf8f2a1160fb0577");
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const db = {
  connectDB: async () => {
    try {
      await mongoose.connect(uri, options);

      const db = mongoose.connection;
      db.on("error", () => {
        rollbar.error("Database connection error");
        console.error.bind(console, "connection error: ");
      });
      db.once("open", () => {
        console.log("Database connected successfully");
      });
      console.log("Connected to: " + uri);
    } catch (error) {
      rollbar.error(error);
      console.log(error);
    }
  },
};

function signalHandler() {
  console.log("Closing MongoDB connection...");
  mongoose.connection.close();
  process.exit();
}

process.on("SIGINT", signalHandler);
process.on("SIGTERM", signalHandler);
process.on("SIGQUIT", signalHandler);

module.exports = db;
