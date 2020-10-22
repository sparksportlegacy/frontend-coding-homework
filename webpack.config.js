const path = require("path");

module.exports = {
  entry: "./src/App.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devtool: "eval-nosources-cheap-module-source-map", //cheap-module-eval-source-map
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
};
