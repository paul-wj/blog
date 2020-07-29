module.exports = {
	dev: {
		NODE_ENV: '"development"',
		BASE_API_URL: '"http://localhost:9000"',
		SOCKET_URL: '"localhost:9000"'
	},
	prod: {
		NODE_ENV: '"production"',
		BASE_API_URL: '"https://www.wangjie818.wang/prod"',
		SOCKET_URL: '"https://www.wangjie818.wang"'
	}
};
