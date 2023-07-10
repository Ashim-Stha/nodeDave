const path = require("path");

const fsPromise = require("fs").promises;

const readFile = async () => {
  try {
    const data = await fsPromise.readFile(
      path.join(__dirname, "promises", "promise.txt"),
      "utf-8"
    );
    console.log(data);

    await fsPromise.unlink(path.join(__dirname, "promises", "promise.txt")); //deletesfile

    await fsPromise.writeFile(
      path.join(__dirname, "promises", "promiseWrite.txt"),
      data
    );

    await fsPromise.appendFile(
      path.join(__dirname, "promises", "promiseWrite.txt"),
      "appending"
    );

    await fsPromise.rename(
      path.join(__dirname, "promises", "promiseWrite.txt"),
      path.join(__dirname, "promises", "rename.txt")
    );
  } catch (err) {
    console.log(err);
  }
};

readFile();
