const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {appIndexJs, appBuild, appSrc, appHtml, appNodeModules} = require('../config/paths');


module.exports = {
	stats: {
		builtAt: false,
		children: false,
		colors: true,
		modules: false,
		hash: false,
		version: false,
		entrypoints: false
	},
	entry: appIndexJs,
	output: {
		filename: 'js/[name].[hash].js',
		chunkFilename: 'js/[name].[chunkhash:8].js',
		publicPath: "/"
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
		modules: [appNodeModules]
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM",
		'antd': 'antd',
		'highlight.js': 'hljs',
		'marked': 'marked',
		'socket.io-client': 'io',
		'@antv/g2': 'G2',
		'@antv/data-set': 'DataSet',
		'aplayer': 'APlayer'
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				enforce: "pre",
				use: [
					{
						loader: 'eslint-loader',
						options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
							formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
						}
					}
				],
				include: appSrc,
				exclude: appNodeModules
			},
			{
				test: /\.ts(x?)$/,
				loader: 'babel-loader',
				include: appSrc,
				exclude: appNodeModules
			},
			{
				test: /\.(sc|c)ss$/,
				use: ['style-loader', 'css-loader', {
					loader: 'postcss-loader',
					options: {
						plugins: [
							require("autoprefixer")
						]
					}
				}, "sass-loader"],
			},
		],
	},
	plugins: [
		// http://vuejs.github.io/vue-loader/en/workflow/production.html
		new webpack.DefinePlugin({
			'process.env': require('./process.env.conf')[process.env.env_config]
		}),
		new HtmlWebpackPlugin({
			fileName: 'index.html',
			template: appHtml,
			inject: true
		})
	]
};
