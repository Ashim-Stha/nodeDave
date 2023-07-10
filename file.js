const fs = require("fs");

// fs.readFile("./files/h.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data);
//   console.log(data.toString());
// });

// fs.readFile("./files/h.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

console.log("i am 1st haha");

//instead of hardcoding file location

const path = require("path");

console.log(__dirname);
fs.readFile(path.join(__dirname, "files", "h.txt"), "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.writeFile(
  path.join(__dirname, "files", "write.txt"),
  "created new file",
  (err) => {
    if (err) throw err;
    console.log("Write op");

    fs.appendFile(
      path.join(__dirname, "files", "write.txt"),
      "\n\n appending",
      (err) => {
        if (err) throw err;
        console.log("Append op");
      }
    );

    fs.rename(
      path.join(__dirname, "files", "write.txt"),
      path.join(__dirname, "files", "rename.txt"),
      (err) => {
        if (err) throw err;
        console.log("Rename op");
      }
    );
  }
);

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Error ${err}`);
  process.exit(1);
});
