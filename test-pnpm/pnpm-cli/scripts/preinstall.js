const log = require("npmlog");

if (!/pnpm/.test(process.env.npm_execpath)) {
  log.error(`必须使用 pnpm install 安装依赖`);
  process.exit(1);
}
