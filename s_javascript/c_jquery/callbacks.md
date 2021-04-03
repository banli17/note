# Callbacks 源码解析

Callbacks 用于创建一个回调函数列表。

Callbacks 的参数，而且可以传入多个组合，用空格分开：

-   `once`: fire() 只能触发一次，后面再调用 fire() 不会被触发。
-   `memory`: 会记住上次 fire(x) 调用时传的参数 x，并在后续 add 时立马调用函数，并将 x 传递给函数。
-   `unique`: 一个函数只能被添加一次。
-   `stopOnFalse`: 如果有函数返回 false，则停止执行后面函数。

Callbacks 的 API 列表：

```
add: ƒ ()
remove: ƒ ()
has: ƒ ( fn )
empty: ƒ ()
disable: ƒ ()
disabled: ƒ ()
lock: ƒ ()
locked: ƒ ()
fireWith: ƒ ( context, args )
fire: ƒ ()
fired: ƒ ()
```
