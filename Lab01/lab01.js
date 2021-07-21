const child_process = require("child_process");

console.log("1: App start");

const myProcess = child_process.spawn("node", ["_fibonacci.js"], {
  stdio: "inherit",
});

console.log("2: App end");
