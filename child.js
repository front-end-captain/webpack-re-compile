const chalk = require("chalk");

console.log("child id", process.pid);
console.log();

process.env.APP_ROLE_IS_CHILD = "APP_ROLE_IS_CHILD";

console.log(chalk.bgBlue("before change parent process.env in child"));
console.log();
console.log("APP_ROLE_IS_PARENT", process.env.APP_ROLE_IS_PARENT);
console.log();
console.log("APP_ROLE_IS_CHILD", process.env.APP_ROLE_IS_CHILD);
console.log();

process.env.APP_ROLE_IS_PARENT = "APP_ROLE_IS_PARENT_CHANGED";

console.log(chalk.bgBlue("after change parent process.env in child"));
console.log();
console.log("APP_ROLE_IS_PARENT", process.env.APP_ROLE_IS_PARENT);
console.log();
console.log("APP_ROLE_IS_CHILD", process.env.APP_ROLE_IS_CHILD);
console.log();


// process.send({ message: "from CHILD" });
// process.on("message", (data) => {
//   console.log("CHILD receive message", data);
// });
