#!/usr/bin/env node

const log = require("cli-log");
const importLocal = require("import-local");
if (importLocal(__dirname)) {
  log.info("cli", `use local cli package`);
} else {
  require("../src/index.js")();
}
