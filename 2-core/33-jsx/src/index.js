
class Component {
    constructor() {
        // 要对 children 进行分类
        if (this.render) {
            const { root, children } = this.render()
            this.root = root
            this.selfChildren = children
        } else {
            this.root = document.createElement('div')
            this.children = []
        }
    }

    appendChild(child) {
        if (typeof child === 'string') {
            child = new Text(child)
        }

        if (child.parent === this) {
            this.children.push(child)
        } else {
            this.selfChildren.push(child)
        }
    }

    setAttribute(key, value) {
        this.root.setAttribute(key, value)
    }

    mountTo(container) {
        if (!this.root) {
            throw new Error(`render 函数必须写 jsx`)
        }

        if (container) {
            container.appendChild(this.root)
        }

        for (let child of this.children) {
            // 如果是 <Parent />  就不渲染子元素，将子元素放 children 里
            if (!this._isClassComponent || this._isClassComponent && !child._isClassComponent) {
                child.mountTo(this.root)
            }
        }
    }
}

class Text {
    constructor(text) {
        this.root = document.createTextNode(text)
    }

    mountTo(container) {
        container.appendChild(this.root)
    }
}

class NativeElementComponent extends Component {
    constructor(tag) {
        super()
        this.root = document.createElement(tag)
    }
}

class ClassComponent extends Component {
    constructor() {
        super()
        this._isClassComponent = true
    }
}

class Parent extends ClassComponent {
    constructor(config) {
        super(config)
    }

    set id(v) {
        console.log("Parent::id set", v)
    }

    render() {
        return <div id="a">
            <div>header</div>
            {this.children}
        </div>
    }
}
class Child extends ClassComponent {
    constructor(config) {
        super(config)
    }

    render() {
        return <div>child</div>
    }
}

function create(Cls, attrs, ...children) {
    let o
    if (typeof Cls === 'string') {
        o = new NativeElementComponent(Cls)
    } else {
        o = new Cls()
    }
    for (let key in attrs) { // props 是 null 时不会报错
        // o[key] = attrs[key]
        // 如果要将 props 和 attrs 分开
        o.setAttribute(key, attrs[key])
    }

    for (let child of children) {
        child.parent = o
        o.appendChild(child)
    }

    console.log('ooo', o);

    return o
}

let comp = <Parent name="zhangsan" age="12">
    <Child></Child>
</Parent>

// <span>hello world</span>
// comp = <span>hello world</span>

comp.age = 13
comp.id = '_id'

// 小写会被编译程 "cls", Cls 会被当作变量

comp.mountTo(document.querySelector('#app'))