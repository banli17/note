# 测试的原理


## 断言

断言是程序设计人员对系统应达到状态的一种预期，它是单元测试的核心。很多语言都内置了断言接口，比如node 的 Assert。

```
function assert(expression, message){
    return expression
}
asset(1+1 === 2, '1 + 1 = 2')
```

## 测试框架的设计

1. 抽离代码，避免污染源代码
2. 放在专门的目录
3. 整体设计
4. 自动运行，显示结果并统计

按照上面的要求封装成一个函数。

```javascript
function testCase(message, tests){
    var total = 0
    var success = 0
    for(var test in tests){
        total += 1
        var ret = tests[test](test)

        if(ret){
            success += 1
        }
    }
    console.log( success + '/' + total)
}

function assert(expression, message) {
    console.log(expression, message)
    return expression
}

testCase('query', {
    'test name = 3'(message){
        return assert(query('name', 'name=3') === 3, message)
    },
    'test name = 3'(message){
        return assert(query('name', '?name=3') === 3, message)
    }
})
```

## TDD测试驱动开发

TDD 是 Test Driven Development。它的流程如下

```
分析需求 -> 任务、模块拆解 ->  编写测试用例 -> 快速构建代码 -> 重构 -> 功能测试、发布
```

- 先有测试，再来开发
- 测试用例和断言
- 单元测试、模块测试
- 测试框架




[f2etest](https://github.com/alibaba/f2etest)


webdriver


karma runner


JSDoc


13.单元测试
1.测试用例和需求分析
2.单元测试框架mocha/ava
3.自动化测试之selenium

18.功能测试与性能测试
1.测试用例和需求分析
2.常用功能测试框架基础使用(mocha/ava)
3.常用性能测试框架基础使用(Benchmark)
