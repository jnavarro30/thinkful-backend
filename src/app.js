const express = require("express");
const app = express();
const morgan = require("morgan");

const checkForAbbreviationLength = (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next("State abbreviation is invalid.");
  } else {
    next();
  }
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

app.get(
  "/states/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    const abbreviation = req.params.abbreviation;
    res.send(`${abbreviation} is a nice state, I'd like to visit.`);
  }
);

app.get(
  "/travel/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    const abbreviation = req.params.abbreviation;
    res.send(`Enjoy your trip to ${abbreviation}!`);
  }
);

// Not-found handler
app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});

module.exports = app;
