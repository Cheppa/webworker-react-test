const WorkerPlugin = require("worker-plugin");
module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      return webpackConfig;
    },
    plugins: [new WorkerPlugin()],
  },
};
