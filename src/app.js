const express = require("express");
const app = express();
const morgan = require("morgan");

const logging = (req, res, next) => {
  console.log("A request is being made!");
  next();
};

// app.use(logging);
app.use(morgan("dev"));

app.get("/hello", (req, res) => {
  console.log(req.query);
  const name = req.query.name;
  const content = name ? `Hello, ${name}!` : "Hello!";
  res.send(content);
});

app.get("/say/:greeting", (req, res) => {
  const greeting = req.params.greeting;
  const name = req.query.name;

  const content = greeting && name ? `${greeting}, ${name}!` : `${greeting}!`;
  res.send(content);
});

module.exports = app;
