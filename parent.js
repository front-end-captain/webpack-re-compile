process.env.APP_ROLE_IS_PARENT = "APP_ROLE_IS_PARENT";

console.log("parent id", process.pid);

const { fork } = require("child_process");
const chokidar = require("chokidar");

const childPath = require.resolve("./child.js");
const chalk = require("chalk");

let child = fork(childPath);

const watcher = chokidar.watch(".env*");

watcher.on("change", (filepath) => {
  console.log();
  console.log(filepath + " was changed");

  console.log();
  console.log(chalk.yellow(`Try to restart dev server...`));
  console.log();

  const changed_env = process.env;

  child.kill();
  child = fork(childPath, { env: {} });
});
