const MagicString = require("magic-string");
const { parse } = require("acorn");
const { hasOwnProperty } = require("./utils");
let analyse = require("./ast/analyse");

const SYSTEMS = ["console", "log"];

class Module {
  constructor({ code, path, bundle }) {
    this.code = new MagicString(code, { filename: path });
    this.path = path;
    this.bundle = bundle;
    this.ast = parse(code, {
      ecmaVersion: 6,
      sourceType: "module",
    });
    console.log(this.ast);

    //存放本模块的导入信息
    this.imports = {};
    //本模块的导出信息
    this.exports = {};
    //存放本模块的定义变量的语句 a=>var a = 1;b =var b =2;
    this.definitions = {};
    //存放变量修改语句
    this.modifications = {};
    this.canonicalNames = {};
    analyse(this.ast, this.code, this);
  }

  expandAllStatements() {
    let allStatements = [];
    // 只遍历顶层节点
    this.ast.body.forEach((statement) => {
      // import 语句会被替换
      if (statement.type === "ImportDeclaration") return;
      // 默认不包含所有的变量声明语句
      if (statement.type === "VariableDeclaration") return;
      let statements = this.expandStatement(statement); // 扩展当前节点
      console.log('statements', statements)
      allStatements.push(...statements);
    });
    return allStatements;
  }

  // 转换需要加工的语句
  expandStatement(statement) {
    statement._included = true;
    let result = [];

    let _dependsOn = Object.keys(statement._dependsOn);
    _dependsOn.forEach((name) => {
      //找到此变量定义的语句，添加到输出数组里
      let definitions = this.define(name);
      console.log(definitions)
      result.push(...definitions);
    });
    // if(_dependsOn.length){
    //   console.log('result', _dependsOn)
    //   process.exit()
    // }

    result.push(statement);

    //找到此语句定义的变量,把定义的变量和修改语句也包括进来
    //注意要先定义再修改，所以要把这行放在push(statement)的下面
    const defines = Object.keys(statement._defines);
    defines.forEach((name) => {
      //找到定义的变量依赖的修改的语句
      const modifications =
        hasOwnProperty(this.modifications, name) && this.modifications[name];
      if (modifications) {
        //把修改语句也展开放到结果里
        modifications.forEach((statement) => {
          if (!statement._included) {
            let statements = this.expandStatement(statement);
            result.push(...statements);
          }
        });
      }
    });
    return result;
  }

  define(name) {
    //先判断此变量是外部导入的还是模块内声明的
    if (hasOwnProperty(this.imports, name)) {
      //说明此变量不是模块内声明的，而是外部导入的,获取从哪个模块内导入了哪个变量
      const { source, importName } = this.imports[name];
      //获取这个模块
      const importModule = this.bundle.fetchModule(source, this.path);
      //从这个模块的导出变量量获得本地变量的名称
      const { localName } = importModule.exports[importName];
      //获取本地变量的定义语句
      return importModule.define(localName); //name
    } else {
      //如果是模块的变量的话
      let statement = this.definitions[name]; //name
      if (statement) {
        if (statement._included) {
          return [];
        } else {
          return this.expandStatement(statement);
        }
      } else {
        if (SYSTEMS.includes(name)) {
          return [];
        } else {
          //如果找不到定义的变量就报错
          throw new Error(
            `变量${name}既没有从外部导入，也没有在当前的模块声明`
          );
        }
      }
    }
  }

  rename(name, replacement) {
    this.canonicalNames[name] = replacement;
  }

  getCanonicalName(name) {
    return this.canonicalNames[name] || name;
  }
}

module.exports = Module;
