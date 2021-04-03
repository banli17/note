function create(Cls, attributes, ...children) {
    let o
    if (typeof Cls === 'string') {
        o = new Wrapper(Cls)
    } else {
        o = new Cls
    }
    for (let name in attributes) {
        // o[name] = attributes[name]
        o.setAttribute(name, attributes[name])
    }
    // console.log(children)
    for (let child of children) {
        if (typeof child === 'string') {
            child = new Text(child)
        }
        o.children.push(child)
        // o.appendChild(child)
    }
    console.log('o', o)
    return o
    // console.log(tag, attr)
}


class Component {
    constructor(config) {
        this.children = []
        this.root = document.createElement('div')
    }

    set class(v) {
        console.log("Parent::class", v)
        this.root.setAttribute('class', v)
    }

    appendChild(child) {
        console.log("Parent::appendChild", child)
        this.children.push(child)
        this.root.appendChild(child)
    }

    setAttribute(name, value) {
        console.log(name, value)
        this.root.setAttribute(name, value)
    }

    mountTo(parent) {
        for (let child of this.children) {
            console.log('this.root', this.root, child)
            child.mountTo(this.root)
        }
        parent.appendChild(this.root)
    }
}

class Text extends Component {
    constructor(text) {
        super()
        this.root = document.createTextNode(text)
    }
}

class Wrapper extends Component {
    constructor(tagName) {
        super()
        this.root = document.createElement(tagName)
    }
}

class Parent extends Component {
    constructor() {
        super()
        this.slot = <div></div>
    }

    appendChild(child) {
        this.children.push(child)
        this.slot.appendChild(child)
    }

    render() {
        return <div class='parent_outer'>
            <div class='parent_inner'>
                {this.slot}
            </div>
        </div>
    }

    mountTo(parent) {
        this.render().mountTo(parent)
        for (let child of this.children) {
            child.mountTo(this.slot)
        }
    }
}

class Child extends Component {

}


// 没有属性，传递的是 null，而不是 {}
let component = <Parent id="a" class='hi'>
    <Child>h child</Child>
    <div>你好</div>
    <div>this is a div</div>
    <span>hi this is a span</span>
    <div class='div'>
        <span>嵌套 span
            <span>嵌套 span</span>
        </span>
    </div>
</Parent>

component.class = "hello"

component.mountTo(document.body)
// 上一句翻译成了
// var component = create(Parent, {
//     id: "a"
// }, create(Child, null), create(Child, null));
// jsx 大写标签会编译为类 R.create(Cls, { id: "a" })
// jsx 小写标签会编译为字符串 R.create("cls", { id: "a" })

// component.setAttribute('id', 'a')
