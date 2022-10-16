const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION, Shutting server down...");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

mongoose.connect(process.env.DATABASE).then(() => {
  console.log("Database connection successful!");
});

const { PORT } = process.env;
const server = app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION, Shutting server down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
