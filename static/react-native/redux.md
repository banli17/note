# redux

## redux基础知识

```markup
npm init 
npm install webpack redux  
npm install babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-stage-0 --save-dev
```

**原理**

在 redux(flux单向数据流)中，用户的操作不会直接导致view层的更新，而是view层发出actions通知触发store里的reducer，从而更新state，state的改变将会更新反馈给view层，从而让让view层发生变化。

**store**
store是保存数据的地方，整个应用只能有一个store。
```
import {createStore} from 'redux'
const store = createStore(fn)
```

**state**
store对象包含所有的数据，如果想得到某个时点的数据，就要对store生成快照，这种时点的数据集合，叫state。可以通过store.getState()拿到。
```
import {createStore} from 'redux'
const store = createStore(fn)
const state = store.getState()
```
**action**

