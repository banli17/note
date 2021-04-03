// 扩展属性 

declare global { // 将一下内容合并到global上去
    interface String {
        double():string
    }
    interface Window {
        xxx:string
    }
}

// js 语法
String.prototype.double = function () {
    return this as string + this; // 隐式类型转化 一方是字符串 另一方也会转化成字符串
}
window.xxx


// 1) 接口默认会合并 可以给已有的属性合并属性或者方法
// 2) 类和命名空间可以合并 
// 3) 函数和命名空间可以合并
// 4) 枚举和命名空间可以合并 
// >  表达式都没法合并 ----
// 5) 交叉类型合并数据


// d.ts   默认打包出来的代码 可以指定生成.d.ts 文件

// 1.默认先查找node_modules  package.json types字段 有说明直接就找到了
// 2.找对应包下有没有 index.d.ts 如果没有说明此包没有用ts来写
// 3.找@types下的文件来查找 index.d.ts 
// 4.可以查找路由 paths
// 5.查找include 目录下的文件 、 或者全局下所有的 .d.ts文件

export {}