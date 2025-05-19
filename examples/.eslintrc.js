export default {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			rules: {
				semi: 0,
				"@typescript-eslint/no-shadow": ["error"],
				"no-shadow": "off",
				"no-undef": "off",
				"no-unused-vars": "off",
				"no-empty-function": "off", //TODO: need to use this in .test.ts* files. Fix it
			},
		},
	],
};
