var webpack = require('webpack');
var path = require('path');
var Config = require('webpack-config').Config;

module.exports = new Config().merge({
    entry: {
        main: './src/main'
    },

    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: '[name].js'
    },

    plugins: [
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,

            loader: 'babel-loader',

            include: [
                path.resolve(__dirname, "src")
            ],

            // Options to configure babel with
            query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'react'],
            }
        }]
    }
});
