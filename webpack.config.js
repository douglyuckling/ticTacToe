var webpack = require('webpack');
var path = require('path');

module.exports = {
    debug: true,
    devtool: 'inline-source-map',

    entry: {
        main: './src/main'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
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
};
