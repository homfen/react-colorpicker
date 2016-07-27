var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    hot: true
});
server.listen(8080);
