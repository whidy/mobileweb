const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const IS_DEV = process.env.NODE_ENV === "dev";
module.exports = {
  mode: IS_DEV ? "development" : "production",
  devtool: IS_DEV ? "eval" : "source-map",
  entry: {
    index: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: "head",
      scriptLoading: "blocking",
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? "[name].css" : "[name].[fullhash].css",
      chunkFilename: IS_DEV ? "[id].css" : "[id].[fullhash].css",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    compress: true,
    host: "0.0.0.0",
    port: 9000,
    inline: true,
    disableHostCheck: true,
  },
};
