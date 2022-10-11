const fs = require("fs");
const path = require("path");
const Module = require("./module");
const MagicString = require("magic-string");
const { hasOwnProperty, replaceIdentifiers } = require("./utils");

class Bundle {
  constructor(options) {
    this.entryPath = path.resolve(options.entry.replace(/\.js/, "") + ".js");
    this.modules = {};
  }

  build(filename) {
    // 创建入口模块
    const entryModule = this.fetchModule(this.entryPath);

    // 解析模块的所有语句
    this.statements = entryModule.expandAllStatements(true);
    this.deconflict();
  }

  write(filename) {
    const { code } = this.generate();
    fs.writeFileSync(filename, code);
  }

  deconflict() {
    const defines = {}; //定义的变量
    const conflicts = {}; //变量名冲突的变量
    this.statements.forEach((statement) => {
      Object.keys(statement._defines).forEach((name) => {
        if (hasOwnProperty(defines, name)) {
          conflicts[name] = true;
        } else {
          defines[name] = []; //defines.age = [];
        }
        //把此声明变量的语句，对应的模块添加到数组里
        defines[name].push(statement._module);
      });
    });
    Object.keys(conflicts).forEach((name) => {
      const modules = defines[name]; //获取定义此变量名的模块的数组
      modules.pop(); //最后一个模块不需要重命名,保留 原来的名称即可 [age1,age2]
      modules.forEach((module, index) => {
        let replacement = `${name}$${modules.length - index}`;
        module.rename(name, replacement); //module age=>age$2
      });
    });
  }

  fetchModule(importee, importer) {
    let route = importee;

    // 入口模块
    if (!importer) {
      route = importee;
    } else {
      // 依赖模块
      if (path.isAbsolute(importee)) {
        route = importee;
      } else {
        route = path.resolve(
          path.dirname(importer),
          importee.replace(/\.js/, "") + ".js"
        );
      }
    }
    if (route) {
      // console.log("route", route);
      let code = fs.readFileSync(route, "utf8");
      const module = new Module({
        code,
        path: importee,
        bundle: this,
      });
      // console.log("module", module);
      return module;
    }
  }

  generate() {
    let magicString = new MagicString.Bundle();
    this.statements.forEach((statement) => {
      // 获取要替换的变量名
      let replacements = {};
      console.log("_dependsOn", statement._dependsOn);
      console.log("_defines", statement._defines);
      Object.keys(statement._dependsOn)
        .concat(Object.keys(statement._defines))
        .forEach((name) => {
          const canonicalName = statement._module.getCanonicalName(name);
          if (name !== canonicalName) replacements[name] = canonicalName;
        });
      console.log("replacements", replacements);

      // console.log("statement", statement);
      const source = statement._source.clone();

      if (statement.type === "ExportNamedDeclaration") {
        source.remove(statement.start, statement.declaration.start);
      }
      console.log('source', source.toString())
      replaceIdentifiers(statement, source, replacements);
      magicString.addSource({
        content: source,
        separator: "\n",
      });
    });
    return { code: magicString.toString() };
  }
}

module.exports = Bundle;
