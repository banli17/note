const path = require("path");
const rollup = require("./index");

const entry = path.resolve(__dirname, "./src/main.js");

const bundle = rollup(entry);

const output = path.resolve(__dirname, "./dist/bundle.js");
const gen = bundle.generate(output);
console.log(gen)
bundle.write(output);
