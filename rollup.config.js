// import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript";
const myterserplugin = terser({
  sourcemap: true,
  toplevel: true,
  output: {
    comments: !1,
    ascii_only: !0
  },
  compress: {
    toplevel: true,
    unused: true,
    drop_console: true,
    drop_debugger: true,
    pure_funcs: ["console.log"]
  },
  mangle: { properties: false }
});
export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "./dist/index.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      json(),
      resolve(),
      commonjs(),
      typescript(),
      terser({
        compress: false,
        mangle: false,
        output: {
          comments: !1,
          beautify: true
        }
      })
    ]
  },
  {
    input: "./dist/index.js",
    output: [
      {
        file: "./dist/index.min.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [resolve(), commonjs(), myterserplugin]
  }
  /*   {
    input: "./test/index.js",
    output: [
      {
        file: "./test/index-es5.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      terser({
        compress: false,
        mangle: false,
        output: {
          ecma: 5,
          comments: !1,
          beautify: true
        }
      }),
      babel({
        plugins: ["@babel/plugin-proposal-class-properties"],
        presets: ["@babel/preset-env"]
      })
    ]
  } */
];
