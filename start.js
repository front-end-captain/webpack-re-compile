const child_process = require("child_process");
const chokidar = require("chokidar");
const chalk = require("chalk");

process.env.APP_MY_ENV="brendan.ye";
console.log("parent id", process.pid);

const childPath = require.resolve("./serve.js");

let child = child_process.fork(childPath);

process.on("SIGINT", () => {
  child.kill("SIGINT");
  process.exit();
});
process.on("SIGTERM", () => {
  child.kill("SIGTERM");
  process.exit();
});

const watcher = chokidar.watch(".env*");

watcher.on("change", (filepath) => {
  console.log();
  console.log(filepath + " was changed");

  console.log();
  console.log(chalk.bgYellow(`Try to restart dev server...`));
  console.log();

  const changed_env = process.env;
  child.kill();
  child = child_process.fork(childPath, { detached: true, env: {} });
})
