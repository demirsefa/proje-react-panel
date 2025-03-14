import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss'

export default {
	input: "src/index.tsx",
	output: [
		{
			file: "public/dist/index.js",
			format: "iife",
			sourcemap: true,
		},
	],
	plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify( 'development' )
		}),
		external(), resolve(), commonjs(),		typescript({ tsconfig: "tsconfig.json", clean: true }),
		scss({ fileName: 'bundle.css' }),
		serve({
			open: true,
			verbose: true,
			contentBase: ["", "public"],
			host: "localhost",
			port: 3000,
			historyApiFallback: true
		}),
		livereload({ watch: "public/dist" }),],
};
