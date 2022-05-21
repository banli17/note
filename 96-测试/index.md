# 前端测试原理

## 什么是断言

断言是对结果的一种预期，它是单元测试的核心。很多语言都内置了断言接口，比如`node`的`Assert`，`console.assert`等。

比如现在有个需求，实现两个数的相加。所以写了下面的代码：

```javascript
const add = (a, b) => a + b;
```

上面的代码显然是正确的，但是无法证实，而且我有可能写错了，写成了：

```javascript
const add1 = (a, b) => a + b + 2;
```

所以我需要验证一下方法的正确性。比如我期望`add(1, 2)`的结果是`3`。这就是一个断言。于是我封装了一个`assert`方法。

```javascript
/**
 * 期望fn()运行结果是result
 */
function assert(message, fn, result) {
  return fn() === result;
}
asset("我希望1 + 2 = 3", () => add(1, 2), 3); // true
asset("我希望1 + 2 = 3", () => add1(1, 2), 3); // false
```

## 测试框架设计原则

项目中我们往往使用测试框架来进行测试。我们期望测试框架设计成：

1. 抽离代码，避免污染源代码
2. 放在专门的目录,持久化
3. 整体设计
4. 自动运行，显示结果并统计

按照上面的要求可以简单的封装成一个函数。

```javascript
function testCase(message, tests) {
  var total = 0;
  var success = 0;
  for (var test in tests) {
    total += 1;
    var ret = tests[test](test);

    if (ret) {
      success += 1;
    }
  }
  console.log(success + "/" + total);
}

function assert(expression, message) {
  console.log(expression, message);
  return expression;
}

// 测试用例
testCase("query", {
  "test name = 3"(message) {
    return assert(query("name", "name=3") === 3, message);
  },
  "test name = 3"(message) {
    return assert(query("name", "?name=3&age=12") === 3, message);
  },
});
```

上面的代码很简单，只要函数的运行结果和我们的预期一致，则表示这个测试用例成功。

## 什么是 TDD 测试驱动开发

TDD 是 Test Driven Development。它的流程如下: `分析需求 -> 任务、模块拆解 -> 编写测试用例 -> 快速构建代码(代码差也不要紧，测试保证重构不出错) -> 重构 -> 功能测试、发布`。

- 先有测试，再来开发，测试保障开发不出问题。
- 测试用例和断言
- 单元测试(模块测试)
- 测试框架

TDD 这个理念，很多人推崇，也有很多人反感，我们用它好的地方就行。一些开源库，如 jQuery，lodash ，TDD 再也合适不过的，当然也有不合适的地方，那就不用。

## 持续集成

持续集成是一种软件开发实践，即团队开发成员经常集成他们的工作，通常每个成员每天至少集成一次，也就意味着每天可能会发生多次集成。每次集成都通过自动化的构建（包括编译，发布，自动化测试)来验证，从而尽快地发现集成错误。持续集成的目的是避免集成的问题。

### 持续交付

- [浅谈测试驱动开发（TDD）](https://www.ibm.com/developerworks/cn/linux/l-tdd/)
- [The Difference Between TDD and BDD](https://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)

## 流行测试框架

- `qunit` jquery browser
- `mocha` node && browser expressjs
- `jasmine` node && browser vue jsunit 演化而来
- `karma` angular a test-runner，让系统的浏览器自动跑，搭配其它框架使用
- `jest` react koa 零配置，内置代码覆盖率，强大的 mocks

## 学习资料

- [行为驱动开发（BDD）全面介绍](https://blog.csdn.net/winteroak/article/details/81585299)
- [前端自动化测试探索](http://fex.baidu.com/blog/2015/07/front-end-test/)
- [如何进行前端自动化测试？](https://www.zhihu.com/question/29922082)
- [jest document](https://facebook.github.io/jest/docs/en/getting-started.html)
- [jest matchers](https://jestjs.io/docs/en/expect.html)
- [断言库 chaijs](https://www.chaijs.com/)
- [实例解析防抖动（Debouncing）和节流阀（Throttling）](https://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/)
