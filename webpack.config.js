const path = require("path");
const PugPlugin = require("pug-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.pug", // => dist/index.html
  },
  output: {
    path: path.join(__dirname, "dist/"),
    // output filename of JS files
    filename: "assets/js/[name].[contenthash:8].js",
    assetModuleFilename: path.join("images", "[name].[contenthash][ext]"),
    // publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader, // Pug loader
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("icons", "[name].[contenthash:8][ext]"),
        },
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // enable using Pug files as entry point
    new PugPlugin({
      js: {
        // output filename of extracted JS file from source script
        filename: "assets/js/[name].[contenthash:8].js",
      },
      css: {
        // output filename of CSS files
        filename: "assets/css/[name].[contenthash:8].css",
      },
    }),
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
      },
    }),
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 9000,
  },
};
