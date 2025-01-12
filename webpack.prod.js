const { merge } = require('webpack-merge');
const path = require("path");
const dev = require('./webpack.dev.js');
const TerserPlugin = require('terser-webpack-plugin'); // Import TerserPlugin
require("regenerator-runtime");       // Import it in all the files using async/await


module.exports = merge(dev, {
  mode: 'production',
  devtool: 'source-map',
  
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: false, // Disable parallel processing to reduce memory usage
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs for smaller output
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all', // Enable code splitting
      maxSize: 200000, // Set a limit to chunk size
    },
  },
  
  cache: {
    type: 'filesystem', // Use filesystem caching to avoid reprocessing
  },
  devServer: {
    static: './build',
    historyApiFallback: true,
  },
  
  output : {
    path : path.resolve(__dirname , 'build'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: 'auto'
  }

});
