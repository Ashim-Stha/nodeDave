const fs = require("fs");

if (!fs.existsSync("./dir")) {
  fs.mkdir("./dir", (err) => {
    if (err) throw err;
    console.log("Directory created");
  });
}

if (fs.existsSync("./dir")) {
  fs.rmdir("./dir", (err) => {
    if (err) throw err;
    console.log("Directory removed");
  });
}

process.on("uncaughtException", (err) => {
  console.error(err);
  process.exit(1);
});
