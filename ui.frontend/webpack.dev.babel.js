/* eslint-disable import/no-extraneous-dependencies */
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import config from './webpack.config.babel.js';

const webpackConfig = (env) => {
  const writeToDisk = Boolean(env?.writeToDisk);

  return merge(config, {
    mode: 'development',
    performance: {
      hints: 'warning',
      maxAssetSize: 1048576,
      maxEntrypointSize: 1048576,
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './content/stanley/us/en/home.html',
      }),
    ],
    devServer: {
      proxy: [
        {
          context: (pathname) => {
            if (pathname.startsWith('/etc.clientlibs')) {
              return true;
            }
            if (pathname.startsWith('/content')) {
              return true;
            }
            if (pathname.endsWith('.model.json')) {
              return true;
            }
            return false;
          },
          target: 'http://localhost:4502',
          auth: 'admin:admin',
          changeOrigin: true,
        },
      ],
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      watchFiles: ['src/**/*'],
      hot: false,
      devMiddleware: {
        writeToDisk,
      },
      port: 3000,
      historyApiFallback: {
        rewrites: [{ from: /./, to: '/' }],
      },
    },
  });
};

export default webpackConfig;
