// import LinkedListNode from 'src/demo/data-structures/linked-list/LinkedListNode'
class LinkedListNode {
    constructor(value, next = null) {
        this.value = value
        this.next = next
    }
}
/**
 * 链表
 */
class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    /**
     * @param {*} value 
     * @return {LinkedList}
     */
    append(value) {
        // 新节点
        let newNode = new LinkedListNode(value)

        if (!this.tail) {
            this.head = newNode
            this.tail = newNode
            return this
        }

        this.tail.next = newNode
        this.tail = newNode

        return this
    }

    /**
     * @param {*} value 
     * @return {LInkedListNode}
     */
    prepend(value) {
        let newNode = new LinkedListNode(value, this.head)
        this.head = newNode

        if (!this.head) {
            this.tail = newNode
            return this
        }

        newNode.next = this.head
        return this
    }

    /**
     * 查找元素
     * @param {*} 可以是 value 或 callback
     * @return {LinkedListNode}
     */
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null
        }

        let currentNode = this.head

        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode
            }

            if (value !== undefined && value === currentNode.value) {
                return currentNode
            }

            currentNode = currentNode.next
        }

        return null
    }

    /**
     * 将所有相等的元素删除
     * @param {*} value 
     */
    delete(value) {
        if (!this.head) {
            return null
        }

        let deleteNode = null

        // 如果删除的是头元素，则将头设置为和value不等的元素
        while (this.head && this.head.value === value) {
            deleteNode = this.head
            this.head = this.head.next
        }

        let currentNode = this.head

        // 这里没有比较尾元素，因为它的 next 为 null，自己画图分析
        if (currentNode) {
            while (currentNode.next) {
                if (value === currentNode.next.value) {
                    deleteNode = currentNode.next
                    currentNode.next = currentNode.next.next
                } else {
                    currentNode = currentNode.next
                }
            }
        }

        // 比较尾元素
        if (value === this.tail.value) {
            this.tail = currentNode
        }

        return deleteNode
    }

    deleteHead() {
        if (!this.head) {
            return null
        }

        let deleteNode = this.head

        if (this.head.next) {
            this.head = this.head.next
        } else {
            // 如果只有一个元素
            this.head = null
            this.tail = null
        }

        return deleteNode
    }

    deleteTail() {
        // 0 或 1 个元素
        let deleteTail = this.tail
        if (this.head === this.tail) {
            this.head = null
            this.tail = null
            return deleteTail
        }

        let currentNode = this.head
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null
            } else {
                currentNode = currentNode.next
            }
        }
        this.tail = currentNode
        return deleteTail
    }

    /**
     * 将链表转成数组
     */
    toArray() {
        const nodes = []

        let currentNode = this.head
        while (currentNode) {
            nodes.push(currentNode)
            currentNode = currentNode.next
        }

        return nodes
    }

    /**
     * 
     * @param {将数组转成链表} nodes 
     */
    fromArray(nodes) {
        nodes.forEach(node => this.append(node))

        return this
    }

    toString(callback) {
        return this.toArray().map(node => node.toString(callback).toString)
    }

    /**
     * 反转链表 */
    reverse() {
        let currentNode = this.head
        let prevNode = null
        let nextNode = null

        while (currentNode) {
            nextNode = currentNode.next
            currentNode.next = prevNode

            prevNode = currentNode
            currentNode = nextNode
        }

        this.tail = this.head
        this.head = prevNode

        return this
    }
}

const l = new LinkedList()
l.append(12)
l.append(18)

console.log(l)


const getInputs = children =>
    React.Children.toArray(children).reduce((partialInputs, child) => {
        if (child && child.props && child.props.children) {
            return partialInputs.concat(getInputs(child.props.children));
        }
        if (child && child.props && !!child.props.name)
            return partialInputs.concat(child);
            
        return partialInputs;
    }, []);