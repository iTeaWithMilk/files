const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "boundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[name][ext]",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  //   plugins: [],
  //   devtool: {},
  //   devserver: {},
};
