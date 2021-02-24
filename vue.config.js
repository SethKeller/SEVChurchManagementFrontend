console.log("Mode: " + process.env.NODE_ENV);
module.exports = {
  devServer: {
    host: "localhost"
  },
  publicPath: process.env.NODE_ENV === "development" ? "/" : "/cms/" // use /cms/dist if testing build locally
};
