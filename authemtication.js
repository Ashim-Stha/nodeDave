require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

//connect to DB
connectDB();

app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refreshTokenRoute"));
app.use("/logout", require("./routes/logoutRoute"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employee"));
app.use("/register", require("./routes/register"));

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

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(3500, () => {
    console.log("Server running on 3500");
  });
});
