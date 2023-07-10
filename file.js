const fs = require("fs");

fs.readFile("./h.txt", (err, data) => {
  if (err) throw err;
  console.log(data);
});
