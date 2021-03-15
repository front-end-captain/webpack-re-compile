/**
 * `fork` 创建子进程时默认会将父进程的环境变量传递给子进程，所以在子进程可以访问父进程的环境变量(可读不可写)
 */

process.env.APP_ROLE_IS_PARENT = "APP_ROLE_IS_PARENT";

console.log("parent id", process.pid);
console.log();

const { fork } = require("child_process");
const chokidar = require("chokidar");
const chalk = require("chalk");

const childPath = require.resolve("./child.js");

let child = fork(childPath, { env: {} });

console.log("APP_ROLE_IS_PARENT", process.env.APP_ROLE_IS_PARENT);
console.log();
console.log("APP_ROLE_IS_CHILD", process.env.APP_ROLE_IS_CHILD);
console.log();

const watcher = chokidar.watch(".env*");

watcher.on("change", (filepath) => {
  console.log();
  console.log(filepath + " was changed");

  console.log();
  console.log(chalk.yellow(`Try to restart dev server...`));
  console.log();

  console.log("APP_ROLE_IS_PARENT", process.env.APP_ROLE_IS_PARENT);
  console.log();
  console.log("APP_ROLE_IS_CHILD", process.env.APP_ROLE_IS_CHILD);
  console.log();

  child.kill();
  child = fork(childPath, { env: {} });

  console.log(chalk.bgBlue("after spawn child process"));
  console.log();
  console.log("APP_ROLE_IS_PARENT", process.env.APP_ROLE_IS_PARENT);
  console.log();
  console.log("APP_ROLE_IS_CHILD", process.env.APP_ROLE_IS_CHILD);
  console.log();

  // child.on("message", (data) => {
  //   console.log("PARENT receive message", data);
  // });

  // child.send({ message: "from PARENT" });
});

// child.on("message", (data) => {
//   console.log("PARENT receive message", data);
// });

// child.send({ message: "from PARENT" });
