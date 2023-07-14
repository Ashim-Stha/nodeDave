const express = require("express");
const app = express();

const path = require("path");
const port = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const router = require("./routes/routes");

//default is app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public")));

//to apply css in path /subdir
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", router);
app.use("/employees", require("./routes/api/employee"));

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
// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(500).send(err.message);
// });

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
