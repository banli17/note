# React

## jsx

jsx : js + xml
jsx 属性不能包含关键字
- class : className
- for : htmlFor
- style：会当作对象

```
style={{color: 'red'}}
```

react 元素创建后，是不可变的

```
let el = <div></div>
```
react 17 后不能修改 el，或给 el 添加额外属性，17之前是约定，也可以改。

```
Object.freeze(a) : 不能新增 修改删除属性
Object.seal() 密封，只能修改属性
```

之前需要引入 React 库，否则报错，会转成 React.createElement。
react 17 之后会自动引入并转换为 `jsx()` 函数。

```
const H = ()=> <div></div>

// 会转成
import {jsx as __jsx} from 'react/jsx-runtime'
const H = () => __jsx('div', {})
```

```js
JSON.stringify(obj, replacer, spacing)

function replacer(key,value){
    return value.toUpperCase()
}
```

## 组件

- 函数组件
    - 组件名称首字母大写(会报错)，因为原生组件是小写
    - 组件需要返回并且只返回一个根元素
    
函数组件的虚拟dom: 

```
$$typeof: Symbol(react.element)
key: null
props: {style: {…}, children: Array(2)}
ref: null
type: props => {…}    是一个函数
_owner: null
_store: {validated: false}
_self: undefined
_source: {fileName: "/Users/banli/Desktop/learn/s_react/c_react/src/index.js", lineNumber: 10, columnNumber: 13}
__proto__: Object
```

































