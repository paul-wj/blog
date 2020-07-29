module.exports = {
	parser: '@typescript-eslint/parser', // 解析器
	plugins: [
		'react-hooks',
		'@typescript-eslint',
	],
	extends: [
		'airbnb',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
	],
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true
		},
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', ".scss"]
			}
		},
	},
	rules: {
		'@typescript-eslint/no-explicit-any': ['off'],
		'@typescript-eslint/no-var-requires': ['off'],
		"@typescript-eslint/ban-ts-comment": ["error", {
			'ts-ignore': false
		}],
		"react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx", ".ts", ".tsx", ".scss"] }],
		"react/jsx-indent" : ["error", 4],
		//https://github.com/benmosher/eslint-plugin-import/issues/1615
		'import/extensions': ['error', 'ignorePackages', {
			js: 'never',
			mjs: 'never',
			jsx: 'never',
			ts: 'never',
			tsx: 'never',
			scss: 'never',
		}],
		"react/jsx-props-no-spreading": "off",
	},
};
