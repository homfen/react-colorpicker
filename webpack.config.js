var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080',
        'webpack/hot/only-dev-server',
        './app/main.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: [path.resolve(__dirname, 'node_modules')],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'babel?cacheDirectory=true,presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-decorators-legacy'
                ],
            }
        ]
    },
    plugins: [
          new webpack.HotModuleReplacementPlugin()
    ]
};
