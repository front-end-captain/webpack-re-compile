const { config } = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const path = require("path");
const chalk = require("chalk");

/**
 *
 * @param {string} mode development | test | demo | production
 * @param {string} commandName serve | build
 */
function loadAndSetEnv(context, mode, commandName) {
  const basePath = path.resolve(context, ".env");
  const baseModePath = path.resolve(context, `.env.${mode}`);
  // const localModePath = `${baseModePath}.local`;

  const load = (path) => {
    const env = config({ path });

    console.log("env content", env);

    const result = dotenvExpand(env);

    console.log("dotenv expand", result);

    if (!env.error) {
      console.log(chalk.green(`loaded dotenv file ${chalk.green(path)} successfully`));
    }

    console.log();
  };

  // this load order is important
  // env.[mode].local has first priority, env.[mode] has second priority and .env has lowest priority
  // if the three files exist
  // load(localModePath);
  load(baseModePath);
  load(basePath);

  const writeEnv = (key, value) => {
    Object.defineProperty(process.env, key, {
      value: value,
      writable: false,
      configurable: false,
      enumerable: true,
    });
  };

  if (commandName === "serve") {
    writeEnv("NODE_ENV", "development");
    writeEnv("BABEL_ENV", "development");
  }

  if (commandName === "build") {
    writeEnv("NODE_ENV", "production");
    writeEnv("BABEL_ENV", "production");
  }
}

const allowInjectedEnvNamePrefixReg = /^APP_/;

function resolveClientEnv() {
  const env = {};
  Object.keys(process.env).forEach((key) => {
    if (allowInjectedEnvNamePrefixReg.test(key) || key === "NODE_ENV") {
      env[key] = process.env[key];
    }
  });

  for (const key in env) {
    env[key] = JSON.stringify(env[key]);
  }
  return {
    "process.env": env,
  };
}

module.exports = {
  loadAndSetEnv,
  resolveClientEnv,
};
