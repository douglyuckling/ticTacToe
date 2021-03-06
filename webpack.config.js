var webpack = require('webpack');
var Config = require('webpack-config').Config;

module.exports = new Config().extend('./webpack.base.config.js').merge({
    debug: false,
    bail: true,

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
    ],

});
