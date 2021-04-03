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
