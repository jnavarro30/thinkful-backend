const express = require("express");
const app = express();
const morgan = require("morgan");

const sayHello = (req, res, next) => {
  res.send("Hello!");
};

const logging = (req, res, next) => {
  console.log("A request is being made!");
  next();
};

// app.use(logging);
app.use(morgan("dev"));

app.get("/hello", sayHello);

module.exports = app;
