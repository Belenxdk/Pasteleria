const path = require("node:path");
const webpack = require("webpack");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],
    files: [{ pattern: "src/tests/**/*.spec.js", watched: false }, { pattern: "src/tests/**/*.spec.jsx", watched: false }],
    preprocessors: { "src/tests/**/*.spec.js": ["webpack"], "src/tests/**/*.spec.jsx": ["webpack"] },
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      // En las pruebas se simula la API; no se hacen solicitudes reales.
      plugins: [new webpack.DefinePlugin({
        "import.meta.env.VITE_API_URL": JSON.stringify("http://localhost:8080/api/v1"),
      })],
      resolve: { extensions: [".js", ".jsx", ".json"] },
      module: {
        rules: [
          { test: /\.[jt]sx?$/, include: path.resolve(__dirname, "src"), exclude: path.resolve(__dirname, "src/tests"), use: { loader: "babel-loader", options: { babelrc: false, configFile: false, presets: [["@babel/preset-react", { runtime: "automatic" }]], plugins: ["babel-plugin-istanbul"] } } },
          { test: /\.jsx$/, include: path.resolve(__dirname, "src/tests"), use: { loader: "babel-loader", options: { babelrc: false, configFile: false, presets: [["@babel/preset-react", { runtime: "automatic" }]] } } },
        ],
      },
    },
    reporters: ["progress", "coverage"],
    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text-summary" },
        { type: "json-summary", subdir: ".", file: "coverage-summary.json" },
      ],
    },
    browsers: ["ChromeHeadless"],
    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 60000,
    client: { jasmine: { random: true } },
  });
};
