// "off" or 0 - 关闭规则
// "warn" or 1 - 将规则视为一个警告（不会影响退出码）
// "error" or 2 - 将规则视为一个错误 (退出码为1)
module.exports = {
	root: true,

	env: {
		node: true,
	},

	rules: {
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
		'no-debugger': 1,
		semi: [2, 'always'],
		'vue/no-use-v-if-with-v-for': [2, { allowUsingIterationVar: false }],
		'comma-dangle': 'off',
		'one-var': [
			'warn',
			{
				var: 'always',
				let: 'always',
				const: 'never',
			},
		],
		'no-throw-literal': 0,
		'no-new-wrappers': 2,
		'no-useless-escape': 0,
		'no-redeclare': 2,
		'no-tabs': 0,
		'no-mixed-spaces-and-tabs': 1,
		'space-before-function-paren': [0, 'always'],
		'no-unused-vars': 2,
		'no-dupe-keys': 2,
		'no-func-assign': 2,
		'valid-typeof': 2,
		'no-shadow': 0,
		'no-prototype-builtins': 0,
		'no-undef': 0,
		'no-control-regex': 0,
		eqeqeq: [2, 'always'],
		'array-callback-return': 2,
	},

	overrides: [
		{
			files: ['*.vue'],
			rules: {
				'vue/multi-word-component-names': 'off',
			},
		},
	],

	parserOptions: {
		parser: '@babel/eslint-parser',
	},

	extends: ['plugin:vue/essential', 'eslint:recommended'],
};
