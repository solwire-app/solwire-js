import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import css from "rollup-plugin-import-css";

const config = [
  {
    input: "src/react/index.tsx",
    output: [
      {
        file: "dist/react/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/react/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        plugins: [require("tailwindcss"), require("autoprefixer")],
        inject: true,
        extract: false,
      }),
      css(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/vanilla.ts",
    output: [
      {
        file: "dist/vanilla/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/vanilla/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/vanilla/index.umd.js",
        format: "umd",
        name: "Solwire",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      css(),
    ],
    external: [],
  },
  {
    input: "src/react/index.tsx",
    output: [{ file: "dist/react/index.d.ts", format: "esm" }],
    plugins: [dts.default(), css()],
  },
  {
    input: "src/vanilla.ts",
    output: [{ file: "dist/vanilla/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
  },
];

export default config;
