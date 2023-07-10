//for large chunk of data

const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.join(__dirname, "stream", "lorem.txt"), {
  encoding: "utf-8",
});

const ws = fs.createWriteStream(path.join(__dirname, "stream", "new.txt"));

//event listener
// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });

//more better way

rs.pipe(ws);
