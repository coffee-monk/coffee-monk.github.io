import { join } from "path";
import merge from "webpack-merge";
import ChunkRenamePlugin from "chunk-rename-webpack-plugin";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

const include = join(__dirname, "src");
const baseConfig = {
  entry: {
    Addon: "./src/addon",
  },
  output: {
    path: join(__dirname, "dist"),
    filename: "[name].js",
    library: "[name]",
  },
  mode: "none",
  module: {
    rules: [{ test: /\.js$/, loader: "babel-loader", include }],
  },
};

const browserConfig = merge(baseConfig, {
  plugins: [
    new ChunkRenamePlugin({
      Addon: "addon.js",
    }),
  ],
});

const browserMinifiedConfig = merge(baseConfig, {
  devtool: "source-map",
  plugins: [
    new ChunkRenamePlugin({
      Addon: "addon.min.js",
    }),
    new UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
});

const commonJsConfig = merge(baseConfig, {
  output: {
    path: join(__dirname, "lib"),
    libraryTarget: "commonjs",
  },
  plugins: [
    new ChunkRenamePlugin({
      Addon: "addon.js",
    }),
  ],
});

module.exports = [browserConfig, browserMinifiedConfig, commonJsConfig];
