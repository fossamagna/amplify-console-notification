const path = require("path");

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  entry: "./src/app.ts",
  output: {
    path: path.resolve(__dirname),
    filename: "app.js",
    libraryTarget: "commonjs2"
  },
  externals: {
    'aws-sdk': 'aws-sdk'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  target: "node"
};