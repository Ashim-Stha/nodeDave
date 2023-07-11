const logEvents = require("./logEvents.js");

const EventEmiiter = require("events");

class MyEmitter extends EventEmiiter {}

//initialize object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on("log", (msg) => {
  logEvents(msg);
});

setTimeout(() => {
  //emit event
  myEmitter.emit("log", "Log event emitted");
}, 2000);
