// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './react/react';
import ReactDOM from './react/react-dom';
// const FunctionComponent = (props) => {
//     //props: {style, children}
//     return <div>xx {props.children}
//     </div>
// }

class ClassComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {count: 1}
    }

    componentWillMount() {
        console.log('xxx', this)
        this.setState({
            count: 2
        })
    }

    click = () => {
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log('cb1', this.state.count)
        })
        console.log(this.state.count)
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log('cb1', this.state.count)
        })
        console.log(this.state.count)
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log('cb1', this.state.count)
        })
        console.log(this.state.count)

        setTimeout(() => {
            console.log('内')
            this.setState({
                count: this.state.count + 2
            }, () => {
                console.log('cb2', this.state.count)
            })
            console.log(this.state.count)
            this.setState({
                count: this.state.count + 3
            }, () => {
                console.log('cb2', this.state.count)
            })
            console.log(this.state.count)
            this.setState({
                count: this.state.count + 4
            }, () => {
                console.log('cb2', this.state.count)
            })
            console.log(this.state.count)
        }, 100)
    }

    render() {
        console.log('render')
        return <div className="title"
                    onClick={this.click}
                    style={{backgroundColor: 'green', color: 'red'}}>
            <div>{this.state.count}</div>
            <span>{this.props.name}</span>
            {this.props.children}</div>;
    }
}

let element = <ClassComponent name="hello">world</ClassComponent>;
console.log(element)
// const element = <FunctionComponent style={{background: 'red'}}>
//     hello
//     <span>world</span>
// </FunctionComponent>
//
// // 函数组件的 vdom： type 是一个函数
// console.log('element', element)

/**
 * 1. 将 jsx 转成 vdom
 * 2. render(vdom, container)，将 vdom 转为真实 dom，并更新属性
 * 3. 遍历 vdom 的 children，挂载到 vdom 真实 dom上
 * 4. 将 dom 插入到 container 中
 */
ReactDOM.render(element, document.getElementById('root'));
