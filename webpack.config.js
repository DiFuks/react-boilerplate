/* eslint-disable */

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const Dotenv = require('dotenv-webpack');

const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';
  const isDevServer = process.env.WEBPACK_DEV_SERVER;

  return {
    entry: {
      client: './app/index.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules'),
      ],
      plugins: [new TsconfigPathsPlugin({
        configFile: './tsconfig.json'
      })],
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: [{
          loader: 'cache-loader'
        }, {
          loader: 'thread-loader',
          options: {
            workers: require('os').cpus().length - 1,
            poolTimeout: isDevServer ? Infinity : 500,
          },
        }, {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            ...(isProduction ? {} : {
              getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
            })
          }
        }]
      }, {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `./app/index.html`),
        env: isProduction ? 'production' : 'development',
        inject: 'body',
        minify: {
          collapseWhitespace: isProduction,
        }
      }),
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: true,
        cwd: process.cwd(),
      }),
      new Dotenv(),
      ...(!isDevServer ? [
        new CleanWebpackPlugin(),
      ] : []),
      ...(isProduction ? [
        new ScriptExtHtmlWebpackPlugin({
          inline: ['client']
        })
      ] : [
        new ForkTsCheckerWebpackPlugin({
          checkSyntacticErrors: true,
          eslint: true,
        }),
      ])
    ],
    devtool: !isProduction ? 'source-map' : false,
    devServer: {
      historyApiFallback: true,
      hot: true,
    },
    stats: {
      builtAt: true,
      errors: true,
      assets: false,
      entrypoints: false,
      children: false,
      chunks: false,
      chunkGroups: false,
      modules: false,
      version: false,
    }
  }
}
