const { validate } = require("schema-utils");

const schema = {
  type: "object",
  properties: {
    name: {
      type: "number",
    },
    age: {
      type: "number",
    },
  },
};

class MyPlugin {
  constructor(option = {}) {
    // 校验参数
    // ValidationErrorConfiguration 会在报错时打印
    // [webpack-cli] Invalid option object. MyPlugin has been initialized using an option object that does not match the API schema.
    //  - option.name should be a number.
    validate(schema, option, { name: "MyPlugin", baseDataPath: "option" });
  }

  apply(compiler) {
    console.log("MyPlugin 注册了");

    console.log(compiler.hooks);

    compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
      // compilation 是单次构建对象
      console.log("插件执行了");
      callback();
    });
  }
}

module.exports = MyPlugin;
