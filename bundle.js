const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

webpackConfig.mode = process.env.NODE_ENV;
webpack(webpackConfig).run();
