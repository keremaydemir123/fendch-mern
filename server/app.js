const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const challengeRouter = require("./routes/challengeRoutes");
const projectRouter = require("./routes/projectRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

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
app.use("/api/v1/challenges/:id/projects", projectRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // if next function has an argument, it must be an error
  // and if there is an error, it will go directly to the global
  // error handling middleware
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//! global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
