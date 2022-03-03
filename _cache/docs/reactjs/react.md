# React 真谛

## 数据状态管理

痛点

- 数据谁来维护
  - 内部 state
  - 单一来源？redux
- 数据管理场景
  - 组件之间共享状态
  - 组件修改另一组件的状态

数据持久度分类:

- 快速变更：state
- 中等持续型: redux
- 长久稳定型：storage

redux 怎么用？

- 合理使用 connect，数据变化会导致订阅过数据的组件更新。所以同层组件的数据不要放在父级上。而是分散到下层。
- 扁平化数据结构

redux 的问题？

- 主要在于编写麻烦，一个小需求就要写大量 action reducer

上层解决方案：

- redux-saga 还是很麻烦
- dva 不错
- rematch

它们的思想是

- 简化初始化 state 和 reducer
- 支持副作用
- reducer 和 action 的合并

新的解决方案：

- mbox: 可以将数据作为 observable 拦截，数据变化时，执行 autoRun。和 redux 的区别是 redux 无法感觉数据精细变化，只能 setState。
- context 和 hooks

我们需要什么样的状态管理

- 方便的修改数据，方便的获取数据

## react 的现状和未来
