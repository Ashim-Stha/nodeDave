const { format } = require("date-fns");

const date = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");

console.log(date);
