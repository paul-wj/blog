const presets = [
	[
		"@babel/preset-env",
		{
			"targets": {
				"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
			},
			"corejs": 2,
			"useBuiltIns": "usage"
		}
	],
	"@babel/preset-react",
	"@babel/preset-typescript"
];
const plugins = [
	"@babel/plugin-proposal-nullish-coalescing-operator",
	"@babel/plugin-proposal-optional-chaining",
	"@babel/proposal-class-properties",
	"@babel/proposal-object-rest-spread"
];

//['import', { libraryName: 'antd', "libraryDirectory": "es", style: 'css' }]

if (process.env.env_config === 'prod') {
  plugins.push(["transform-remove-console", {"exclude": [ "error", "warn"] }]);
}

module.exports = {presets, plugins};
