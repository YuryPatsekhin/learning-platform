const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = env => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`env.${next}`] = JSON.stringify(env[next])
    return prev;
  }, {})
  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ]
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      })
    ]
  };
}