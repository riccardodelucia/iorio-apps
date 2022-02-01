module.exports = {
  configureWebpack: {
    devtool: "source-map",
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
    },
  },
};
