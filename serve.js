const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");

console.log("child id", process.pid);

const before_env = process.env;;

const config = require("./webpack.config");

const after_env = process.env;

function serve() {
  const compile = webpack(config.config);

  const server = new webpackDevServer(compile, config.devServer);

  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, () => {
      server.close();
    });
  });

  server.listen(config.devServer.port, config.devServer.host);
}

serve();
