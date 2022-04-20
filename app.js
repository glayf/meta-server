const express = require("express");
const morgan = require("morgan");
//const cors = require("cors");
const compression = require("compression");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
// routes
const pluginRouter = require("./routes/pluginRoutes");

const app = express();

// 1) MIDDLEWARES
//app.use(cors());
app.use(compression());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// 3) ROUTES
app.use("/api/v1/plugins", pluginRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
