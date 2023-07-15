const express = require("express");
const app = express();
const path = require("path");
const verifyJWT = require("./middleware/verifyJWT");

app.use(express.json());

app.use("/auth", require("./routes/auth"));
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

app.listen(3500, () => {
  console.log("Server rinning on 3500");
});
