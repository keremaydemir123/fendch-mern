const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const challengeRouter = require("./routes/challengeRoutes");
const userRouter = require("./routes/userRoutes");

dotenv.config({ path: "./config.env" });

const app = express();

//* MIDDLEWARES
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//! ROUTES
app.use("/api/v1/challenges", challengeRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
