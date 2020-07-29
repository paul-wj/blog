const {merge} = require('webpack-merge');

const webpackBaseConfig = require('./webpack.base.conf');

const config = require('../config');

const {appBuild} = require('../config/paths');

// https://github.com/johnagan/clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// https://github.com/NMFR/optimize-css-assets-webpack-plugin
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

// https://github.com/webpack-contrib/compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const webpackProdConf = merge(webpackBaseConfig, {
	mode: 'production',
	devtool: false,
	output : {
		path: appBuild
	},
	plugins: [
		new CleanWebpackPlugin(),
		new OptimizeCSSPlugin(),
		new CompressionWebpackPlugin({
			test: /\.js$|\.html$|\.css$/,
			// 超过4kb压缩
			threshold: 4096,
		}),
	]
});

// whether need WebpackBundleAnalyzer
if (config.prod.bundleAnalyzer.open) {
	// https://webpack.js.org/guides/code-splitting/#bundle-analysis
	const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
	webpackProdConf.plugins.push(new WebpackBundleAnalyzer(config.prod.bundleAnalyzer.options));
}

module.exports = webpackProdConf;
