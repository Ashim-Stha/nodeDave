const logEvents = require("./logEvents.js");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

//initialize object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on("logg", (msg) => {
  logEvents(msg);
});

setTimeout(() => {
  //emit event
  myEmitter.emit("logg", "Log event emitted");
}, 2000);
