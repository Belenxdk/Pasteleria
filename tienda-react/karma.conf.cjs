const path = require("node:path");

module.exports = function (config) {
  config.set({
    basePath: "",

    frameworks: ["jasmine", "webpack"],

    files: [
      {
        pattern: "src/tests/**/*.spec.js",
        watched: false,
      },
    ],

    preprocessors: {
      "src/tests/**/*.spec.js": ["webpack"],
    },

    webpack: {
      mode: "development",
      devtool: "inline-source-map",

      module: {
        rules: [
          {
            test: /\.js$/,
            include:[
              path.resolve(__dirname, "src/data"),
              path.resolve(__dirname, "src/utils")

            ] ,
          

            use: {
              loader: "babel-loader",

              options: {
                babelrc: false,
                configFile: false,
                plugins: ["babel-plugin-istanbul"],
              },
            },
          },
        ],
      },
    },

    reporters: ["progress", "coverage"],

    coverageReporter: {
      dir: "coverage",
      reporters: [
        {
          type: "html",
          subdir: "html",
        },
        {
          type: "text-summary",
        },
        {
          type: "json-summary",
          subdir: ".",
          file: "coverage-summary.json",
        },
      ],
    },

    browsers: ["ChromeHeadless"],
    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 60000,

    client: {
      jasmine: {
        random: true,
      },
    },
  });
};