import React from 'react';
// import ReactDOM from 'react-dom';

// import React from './react/react';
import ReactDOM from './react/react-dom';
const FunctionComponent = (props) => {
    //props: {style, children}
    return <div>xx {props.children}
    </div>
}
const div = <FunctionComponent style={{background: 'red'}}>
    hello
    <span>world</span>
</FunctionComponent>

// 函数组件的 vdom： type 是一个函数
console.log('div', div)

/**
 * 1. 将 jsx 转成 vdom
 * 2. render(vdom, container)，将 vdom 转为真实 dom，并更新属性
 * 3. 遍历 vdom 的 children，挂载到 vdom 真实 dom上
 * 4. 将 dom 插入到 container 中
 */
ReactDOM.render(div, document.getElementById('root'));
