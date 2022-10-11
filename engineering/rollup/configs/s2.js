import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import clear from "rollup-plugin-clear";
import esbuild from "rollup-plugin-esbuild";
// import plugin1 from "./rollup-plugin-1";
import myExamplePlugin from "./rollup-plugin/rollup-plugin-my-example";
import myPolyfill from "./rollup-plugin/rollup-plugin-polyfill";
import myBabel from "./rollup-plugin/rollup-plugin-babel";
import myDynamicImport from "./rollup-plugin/rollup-plugin-dynamicImport";
import myResolveFileUrl from "./rollup-plugin/rollup-plugin-resolveFileUrl";
import myTranform from "./rollup-plugin/rollup-plugin-transform";

console.log(process.env.NODE_ENV);

const config = {
  input: "./src/index.js",
  // input: "virtual-module",
  output: {
    // file: "./dist/bundle.js",
    // file: 'bundle.js',
    dir: "dist",
    // format: "cjs",
    // format: "umd", // amd", "cjs", "system", "es", "iife" or "umd"
    name: "v", // iife 和 umd 时必须提供,会作为全局变量
    globals: {
      lodash: "_", // 告诉 rollup lodash _变量从全局取
    },
    // exports: 'named'
  },
  plugins: [
    clear({
      targets: ["dist"], // 要清空的目录
      watch: false,
    }),
    // myTranform(),
    esbuild({
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: true, // default
      target: "es2015", // default, or 'es20XX', 'esnext'
    }),
    // myBabel({}),
    // myPolyfill({
    //   a: 1,
    //   b: 2,
    // }),
    // myDynamicImport(),
    // myResolveFileUrl(),
    // resolve(),
    // plugin1(),
    // myExamplePlugin(),
    // babel({
    //     babelHelpers: 'runtime',
    //     exclude: 'node_modules/**',
    //     presets: [
    //         [
    //             "@babel/env", {
    //                 modules: false
    //             }
    //         ]
    //     ],
    //     plugins: [
    //         [
    //             "@babel/plugin-transform-runtime", {
    //                 // "corejs": 3,
    //             }
    //         ]
    //     ]
    // }),
    // commonjs(),
  ],
  external: ["lodash"], // 告诉 rollup 不要打包 lodash
};

if (process.env.NODE_ENV === "dev") {
  config.plugins.push(
    serve({
      open: true,
      contentBase: "./dist",
      port: 8080,
    })
  );
}
if (process.env.NODE_ENV === "prod") {
  // config.plugins.push(terser());
}

export default config;
