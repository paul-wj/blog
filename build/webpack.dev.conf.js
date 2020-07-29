const webpack = require('webpack');
const {merge} = require('webpack-merge');
// https://github.com/geowarin/friendly-errors-webpack-plugin
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
//https://github.com/indexzero/node-portfinder
const portfinder = require('portfinder');
const ip = require('internal-ip');
const webpackBaseConfig = require('./webpack.base.conf');
const config = require('../config');

const webpackDevConf = merge(webpackBaseConfig, {
	mode: 'development',
	devtool: "source-map",
	devServer: {
		stats: 'errors-warnings',
		host: '0.0.0.0',
		port: config.dev.port,
		historyApiFallback: true,
		overlay: {
			//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
			errors: true
		},
		inline: true,
		hot: true,
		compress: true,  //all services start gzip compression,
		useLocalIp: true, //allows the browser to open with a local IP.
		proxy: {},
		watchOptions: {
			ignored: /node_modules/, //忽略不用监听变更的目录
			aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
			poll: 1000 //每秒询问的文件变更的次数
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
});

module.exports = new Promise((resolve, reject) => {
	portfinder.getPort(function (err, port) {
		if(err) {
			reject(err);
		} else {
			webpackDevConf.devServer.port = port;
			const hostname = webpackDevConf.devServer.useLocalIp
				? ip.v4.sync() || 'localhost'
				: webpackDevConf.devServer.host || 'localhost';
			webpackDevConf.plugins.push(
				new FriendlyErrorsWebpackPlugin({
					compilationSuccessInfo: {
						messages: [`Your application is running here: http://${hostname}:${webpackDevConf.devServer.port}`]
					}
				})
			);
			resolve(webpackDevConf);
		}
	});
});

