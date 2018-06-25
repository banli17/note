# jest测试框架

## 学习资料

- [jest document](https://facebook.github.io/jest/docs/en/getting-started.html)

## 学习总结

## 常用的Matchers

- toBe(): 全等，是通过 Object.is() 实现的。 
- toEqual() ：值相等，可以用于判断对象，如 {a:1} 和 {a:1} 是相等的。
- not：将 Matchers 取反，如 not.toBe()
- toBeNull()：只能是 null
- toBeUndefined()：只能是 undefined
- toBeDefined()：非 undefined
- toBeTruthy()：匹配为 true 的表达式
- toBeFalsy()：匹配为 false 的表达式
- toBeGreaterThan()：数字大于
- toBeGreaterThanOrEqual()：数字大于或等于
- toBeLessThan()：小于
- toBeLessThanOrEqual()：小于或等于
- toBeCloseTo()： 近似，比如 expect(0.1+0.2).toBeCloseTo(0.3)
- toMatch()：可以使用正则 expect('Christoph').toMatch(/stop/)
- toContain()：数组包含某个值
- toThrow()：匹配抛出的错误，可以是正则或字符串。如
 
```
function compileAndroidCode() {
    throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```

## 异步测试

```javascript
function ajax(success) {
    setTimeout(() => {
        const data = { name: 3 }
        success(data)
    }, 1000)
}

test("ajax data.name is 3", done => {
    const success = data => {
        expect(data.name).toBe(3)
        done()
    }
    ajax(success)
})
```


## 测试覆盖率

jest 内置了 [istanbul](https://github.com/gotwarlost/istanbul) 生成代码测试覆盖率。

```
node_modules/.bind/jest --coverage
```

运行上面的命令会在项目根目录生成一个 coverage 的目录。打开 `Icov-report/index.html` 可以查看到测试覆盖率，点击网页上具体的文件，可以看到那些代码没有测试到。

![](./imgs/coverage.png)


## 怎么使用 es6 的 import 和 export

node 默认是不支持 es6 的模块导入导出的，需要使用 babel 进行转义。具体方法如下：

**1. 安装插件**

```shell
npm i --save-dev babel-jest babel-core regenerator-runtime babel-plugin-transform-es2015-modules-commonjs
```

- `babel-jest`：安装jest时它会被自动安装，作用是将代码通过 babel 转义。
- `babel-plugin-transform-es2015-modules-commonjs`：用于将es6的 import 和 export 转义
- `regenerator-runtime`：facebook自己出的用于 async/generator 转义的插件

**2. 配置babel**

jest 默认运行环境就是 test。所以在根目录的 .babelrc 文件新增下面代码：

```
{
    "presets": ["env"],
    "env": {
        "test": {
            "plugins": ["transform-es2015-modules-commonjs"]
        }
    }
}
```

**3. 使用**

```javascript
// es6模块文件：util.js
const util = {
    query: function(str){
        return str.replace(/^.+=/, '')
    }
}

export default util


// 测试文件：__test__/util.js
import util from "../src/query"

test("query a  =  3", () => {
    expect(util.query("a=3")).toBe("3")
})
```
