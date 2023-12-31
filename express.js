const express = require("express");
const app = express();

const path = require("path");
const port = process.env.PORT || 3500;

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by default but we need 301
});

//route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to open hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello World!");
  }
);

//chaining route handlers
const one = (req, res, next) => {
  console.log("One");
  next();
};

const two = (req, res, next) => {
  console.log("Two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Chaining route hadlers");
};

app.get("/chain(.html)?", [one, two, three]);

app.get("/*", (req, res) => {
  //we have 404.html so it sends status code 200
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
