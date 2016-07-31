var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: [
        './app/js/main'
    ],
    output: {
        path: __dirname + '/assets/',
        publicPath: '/assets/',
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    resolve: {
        modulesDirectories: [
            'node_modules'
        ],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('style.css', {
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            },
            {
                test: /\.js$/,
                loaders: [
                    'babel?cacheDirectory=true,presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-decorators-legacy'
                ]
            }
        ]
    }
};


if (process.env.NODE_ENV === 'development') {
    config.entry.push('webpack-dev-server/client?http://127.0.0.1:3000');
    config.entry.push('webpack/hot/dev-server');
}

module.exports = config;
