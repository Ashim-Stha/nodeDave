const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents.js");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("log", (msg, filename) => logEvents(msg, filename));
const PORT = process.env.PORT || 3500;

const servefile = async (filepath, contentType, res) => {
  try {
    const rawData = await fsPromises.readFile(
      filepath,
      !contentType.includes("image") ? "utf-8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    res.writeHead(filepath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    res.end(contentType === "application/json" ? JSON.stringify(data) : data);
  } catch (err) {
    console.log(err);

    myEmitter.emit("log", `${err.name}:${err.message}`, "errLog.txt");
    res.statusCode = 500;
    res.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  // if (req.url === "/" || req.url === "index.html") {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");

  //   let filepath = path.join(__dirname, "views", "index.html");
  //   fs.readFile(filepath, "utf-8", (err, data) => {
  //     res.end(data);
  //   });
  // }

  let extension = path.extname(req.url);
  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/javascript";
      break;

    case ".json":
      contentType = "application/json";
      break;

    case ".png":
      contentType = "image/png";
      break;

    case ".jpg":
      contentType = "image/jpeg";
      break;

    case ".txt":
      contentType = "text/plain";
      break;

    default:
      contentType = "text/html";
  }

  let filepath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  //makes .html ext not required in the browser
  if (!extension && req.url.slice(-1) !== "/") filepath += ".html";

  let fileExists = fs.existsSync(filepath);

  if (fileExists) {
    servefile(filepath, contentType, res);
  } else {
    switch (path.parse(filepath).base) {
      case "old-page.html":
        res.writeHead(301, {
          Location: "/new-page.html",
        });
        res.end();
        break;

      case "www-page.html":
        res.writeHead(301, {
          Location: "/",
        });
        res.end();
        break;

      default:
        servefile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
