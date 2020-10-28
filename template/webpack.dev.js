const path = require("path");
const apexnitroConfig = require("./apexnitro.config.json");
const CopyPlugin = require("copy-webpack-plugin");

apexnitroConfig.globals = apexnitroConfig.external.reduce((a, b) => ((a[b] = b), a), {});

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: [apexnitroConfig.mainCss, apexnitroConfig.mainJs],
  output: {
    path: path.resolve(apexnitroConfig.distFolder),
    library: apexnitroConfig.libraryName,
    filename: `${apexnitroConfig.libraryName}.js`
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${apexnitroConfig.libraryName}.css`
            }
          },
          { loader: "extract-loader" },
          { loader: "css-loader?-url" },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              webpackImporter: false,
              implementation: require("sass"),
              sassOptions: {
                includePaths: ["./node_modules"]
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(apexnitroConfig.srcFolder, "static"),
          to: path.resolve(apexnitroConfig.distFolder, "static")
        }
      ]
    })
  ]
};