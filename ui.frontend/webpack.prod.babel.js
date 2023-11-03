/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import config from './webpack.config.babel.js';

const webpackConfig = () =>
  merge(config, {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                calc: true,
                convertValues: true,
                discardComments: {
                  removeAll: true,
                },
                discardDuplicates: true,
                discardEmpty: true,
                mergeRules: true,
                normalizeCharset: true,
                reduceInitial: true, // This is since IE11 does not support the value Initial
                svgo: true,
              },
            ],
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          main: {
            chunks: 'all',
            name: 'site',
            test: 'main',
            enforce: true,
          },
        },
      },
    },
    performance: { hints: false },
  });

export default webpackConfig;
