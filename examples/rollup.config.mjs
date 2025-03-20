import * as path from "node:path";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import scss from "rollup-plugin-scss"; // Import SCSS plugin

// Simulate __dirname

const INPUT_FILE = "src/index.tsx";
const OUTPUT_FILE = "public/dist/index.js";
const ENVIRONMENT = "development";
const SERVER_PORT = 3000;

export default {
    input: INPUT_FILE,
    output: [
        {
            file: OUTPUT_FILE,
            format: "iife",
            sourcemap: true,
        },
    ],
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify(ENVIRONMENT),
        }),
        external(),
        resolve(),
        commonjs(),
        // TypeScript compilation with config
        typescript({
            tsconfig: "tsconfig.json",
            clean: true,
        }),
        // SCSS bundling
        scss({
             fileName: "bundle.css", // Output for the compiled CSS
        }),
        serve({
            open: true,
            verbose: true,
            contentBase: ["", "public"],
            host: "localhost",
            port: SERVER_PORT,
            historyApiFallback: true,
        }),
        // Live reloading for development
        livereload({
            watch: "public/dist",
        }),
    ],
};
