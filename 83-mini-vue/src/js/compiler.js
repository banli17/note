class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm

    this.compile(this.el)
  }

  // 编译模版，处理文本和元素节点
  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }

      if (node.childNodes?.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点，处理指令
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.nodeName // v-text=msg v-model
      if (this.isDirective(attrName)) {
        // v-text -> text 用于策略模式调用 updater
        // v-model -> model
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }

  // 策略模式
  update(node, key, attrName) {
    let updateFn = this[`${attrName}Updater`]
    updateFn && updateFn.call(this, node, key, this.vm[key])
  }

  // 处理 v-text 指令
  textUpdater(node, key, value) {
    node.textContent = value

    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }

  modelUpdater(node, key, value) {
    node.value = value

    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })

    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

  // 处理文本节点，差值表达式
  compileText(node) {
    // console.dir(node)
    // {{ msg }}
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])

      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }

  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  isTextNode(node) {
    return node.nodeType === 3
  }

  isElementNode(node) {
    return node.nodeType === 1
  }
}

// ATTRIBUTE_NODE: 2
// CDATA_SECTION_NODE: 4
// COMMENT_NODE: 8
// DOCUMENT_FRAGMENT_NODE: 11
// DOCUMENT_NODE: 9
// DOCUMENT_POSITION_CONTAINED_BY: 16
// DOCUMENT_POSITION_CONTAINS: 8
// DOCUMENT_POSITION_DISCONNECTED: 1
// DOCUMENT_POSITION_FOLLOWING: 4
// DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
// DOCUMENT_POSITION_PRECEDING: 2
// DOCUMENT_TYPE_NODE: 10
// ELEMENT_NODE: 1
// ENTITY_NODE: 6
// ENTITY_REFERENCE_NODE: 5
// NOTATION_NODE: 12
// PROCESSING_INSTRUCTION_NODE: 7
// TEXT_NODE: 3
