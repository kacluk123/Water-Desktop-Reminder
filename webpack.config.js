const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin')

const mode = process.env.NODE_ENV === 'dev' ? 'development' : 'production'

const getPlugins = (mode) => {
  const plugins = [
    new webpack.DefinePlugin({
      MODE: JSON.stringify(process.env.NODE_ENV),
    })
  ]

  if (mode === 'development') {
    // plugins.push(
    //   new HtmlWebPackPlugin({
    //     template: "./web/index.html"
    //   })
    // )
    plugins.push(
      new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"],
      }),
    )
  }

  return plugins
}

const rendererConfig = {
  entry: './src/renderer/index',
  mode: mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env"
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
    modules: [path.join(__dirname, 'node_modules')],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'web'),
  },
  plugins: getPlugins(mode)
};

const mainConfig= {
  entry: './src/main/main',
  mode: mode,
  target: 'electron-main',
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(__dirname, 'node_modules')],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'web'),
  },
  plugins: getPlugins(mode)
};

const preloadConfig = {
  entry: './src/main/preload',
  mode: mode,
  target: 'electron-preload',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(__dirname, 'node_modules')],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  output: {
    filename: 'preload.js',
    path: path.resolve(__dirname, 'web'),
  },
  plugins: getPlugins(mode)
};

module.exports = [rendererConfig, mainConfig, preloadConfig]