# hooks

## useContext

- Context 的目的是为了共享全局数据，如用户信息，主题，语言等
- Context 可以跨组件传递数据，无需一层层的用 props
- useContext 可以获取最近的 `<MyContext.Provider>` 提供的 value, 相当于 static contextType = MyContext 或者 `<MyContext.Consumer>`
- 当 context 值变化时，该 hook 总会重新渲染，即使上级组件使用了 React.memo 或 shouldComponentUpdate。如果重新渲染开销大，可以给组件本身使用 memo
- 如果 context 的值没有变化，则不会重新渲染，要注意的是

```js
import React from "react";
import ReactDOM from "react-dom";

const ReactContext = React.createContext();
console.log("ReactContext: ", ReactContext);

function App() {
  const [name, setName] = useState("张三");
  return (
    <ReactContext.Provider value={{ name, setName }}>
      <Child />
    </ReactContext.Provider>
  );
}

function Child() {
  const context = React.useContext(ReactContext);
  console.log(context.dispatch); // {name: 'zs'}

  return (
    <div>
      我的名字是：{context.name}
      <button onClick={() => context.setName("张四")}>修改名字</button>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
```

hooks 不能放在 if 里面，否则下次渲染时索引可能会变。

useState 会从根节点把整个应用开始比较。

useState 同步异步问题，异步会获取老值(闭包)，如果是函数会获取最新的值。

实现不刷新组件功能，类似 shouldComponentUpdate
memo 生成新组件
useMemo 缓存数据
useCallback 因为每次渲染 里面的函数都会重新生成新的，所以也要缓存。
它会将数据缓存到依赖里，下次取出时进行浅比较，相等则不会更新。

useEffect 里面可以写副作用代码
默认情况下，每次渲染完成后都会执行

1. 依赖项为空(浅比较)
2. 返回一个函数，清空定时器，这个函数会在下次执行前执行

useEffect 和 useLayoutEffect 的区别
useEffect 是在绘制之后执行。所以在里面改 transform 有动画。
useLayoutEffect 是在绘制前执行。可以在里面做拖拽，这样快些。
useRef
