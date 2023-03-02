const { merge } = require('webpack-merge');
const path = require("path");
const dev = require('./webpack.dev.js');
require("regenerator-runtime");       // Import it in all the files using async/await


module.exports = merge(dev, {
  mode: 'production',
  devtool: 'source-map',
  
  devServer: {
    static: './build'
  },
  
  output : {
    path : path.resolve(__dirname , 'build'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: 'auto'
  }

});
