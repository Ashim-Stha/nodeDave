const express = require("express");
const app = express();

const path = require("path");
const { logger } = require("./middleware/logevents");
const cors = require("cors");
const port = process.env.PORT || 3500;

//app.use is used for all routes

//to handle form data or urlencoded data to extract data from url
app.use(express.urlencoded({ extended: false }));

//for json
app.use(express.json());

//to serve static(css,img,text) files
app.use(express.static(path.join(__dirname, "/public")));

//custom middleware logger
app.use(logger);

//cors=cross origin resource sharing
app.use(cors());

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by default but we need 301
});

app.get("/*", (req, res) => {
  //we have 404.html so it sends status code 200
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
