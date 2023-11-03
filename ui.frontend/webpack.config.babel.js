/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import entryPlus from 'webpack-entry-plus';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import EslintWebpackPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';

const sourceDirectory = path.join(process.cwd(), 'src');
const distributionDirectory = path.join(process.cwd(), 'dist');

const resolve = {
  extensions: ['.js', '.ts', '.vue'],
  plugins: [
    new TsconfigPathsPlugin({
      configFile: './tsconfig.json',
    }),
  ],
  alias: {
    '@': sourceDirectory,
  },
};

const entryFiles = [
  {
    entryFiles: [path.resolve(sourceDirectory, './main.ts')],
    outputName: 'clientlib-vue/vue',
  },
];

const webpackConfig = {
  resolve,
  entry: entryPlus(entryFiles),
  output: {
    path: distributionDirectory,
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(js|mjs|cjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) =>
                `${path.relative(path.dirname(resourcePath), context)}/../../`,
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) =>
                `${path.relative(path.dirname(resourcePath), context)}/../../`,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        exclude: /logo192\.png|logo512\.png$/,
        generator: {
          filename: 'clientlib-vue/resources/assets/[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'clientlib-vue/resources/fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new EslintWebpackPlugin({
      extensions: ['js', 'ts', 'tsx', 'vue'],
      fix: true,
      failOnError: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'clientlib-vue/vue.bundle.css',
    }),
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{css,vue}'],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(sourceDirectory, 'public'),
          to: './clientlib-vue/resources',
        },
      ],
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
    }),
  ],
  stats: {
    assetsSort: 'chunks',
    builtAt: true,
    children: false,
    chunkGroups: true,
    chunkOrigins: true,
    colors: false,
    errors: true,
    errorDetails: true,
    env: true,
    modules: false,
    performance: true,
    providedExports: false,
    source: false,
    warnings: true,
  },
};

export default webpackConfig;
