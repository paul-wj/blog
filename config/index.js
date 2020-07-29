module.exports = {
	dev: {
		port: 3000,
		bundleAnalyzer: {
			open: false,
			options: {analyzerPort: '9998'}
		}
	},
	prod: {
		bundleAnalyzer: {
			open: true,
			options: {analyzerPort: '9998'}
		}
	}
};
