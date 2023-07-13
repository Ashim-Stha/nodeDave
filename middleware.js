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
const allowedSite = [
  "https://www.google.com",
  "http://localhost:3500",
  "https://127.0.0.1:5500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedSite.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); //302 by default but we need 301
});

// app.get("/*", (req, res) => {
//   //we have 404.html so it sends status code 200
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      error: "404 Not Found",
    });
  } else {
    res.type("txt".send("404 Not Found"));
  }
});

//error handler for cors
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
