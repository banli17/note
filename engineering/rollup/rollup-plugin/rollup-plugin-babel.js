import babel from "@babel/core";
export default function (config) {
  // 插件配置参数
  console.log("config", config);

  return {
    name: "my-babel",
    watchChange() {
      console.log("watchChange");
      // process.exit()
    },
    async transform(code, id) {
      const result = await babel.transformAsync(code, {
        // presets: ["@babel/preset-env"],
      });
      console.log(result);
      return result;
    },
  };
}
