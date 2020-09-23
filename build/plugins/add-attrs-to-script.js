const HtmlWebpackPlugin = require('html-webpack-plugin');
// 匹配script标签
const scripts = /<script[^>]*>/gm;
// 匹配script标签上所有的属性
const attrs = /(([^=\s>]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?|>)/mg;

const whiteSrcList = ['src="https://pv.sohu.com/cityjson?ie=utf-8"', 'src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"'];

class AddAttrsToScript {

	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		// 监听compilation事件
		compiler.hooks.compilation.tap('AddAttrsToScript', (compilation) => {
			// 这是一个异步插件, 监听 html-webpack-plugin-before-html-processing 事件
			HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('html-webpack-plugin-before-html-processing', (data, callback) => {
				// 通过 data.html 取出内存中的html数据，并匹配所有的script标签
				const scriptMatch = data.html.match(scripts);
				if (scriptMatch) {
					scriptMatch.forEach(script => {
						// 匹配出所有的属性
						const scriptSections = script.match(attrs);
						if (!whiteSrcList.some(whiteSrc => scriptSections.includes(whiteSrc))) {
							Object.keys(this.options).forEach(attr => {
								if (this.options[attr] === true) {
									scriptSections.splice(scriptSections.length - 1, null, attr)
								} else {
									scriptSections.splice(scriptSections.length - 1, null, `${attr}="${this.options[attr]}"`)
								}
							});
						}
						// replace html 中对用的script标签
						data.html = data.html.replace(script, Array.from(new Set(scriptSections)).join(' '))
					})
				}
				callback(null, data)
			})
		})
	}
}

module.exports = AddAttrsToScript;
