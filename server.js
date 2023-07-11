const http = require("http");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/" || req.url === "index.html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    let filepath = path.join(__dirname, "views", "index.html");
    fs.readFile(filepath, "utf-8", (err, data) => {
      res.end(data);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
