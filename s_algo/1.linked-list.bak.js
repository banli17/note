class LinkedListNode {
    constructor(value, next = null) {
        this.value = value
        this.next = next
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    prepend(value) {
        const newNode = new LinkedListNode(value, this.head)
        this.head = newNode

        if (!this.tail) {
            this.tail = newNode
        }
        return this
    }

    append(value) {
        const newNode = new LinkedListNode(value, this.tail)

        if (!this.head) {
            this.head = newNode
            this.tail = newNode
            return
        }

        this.tail.next = newNode
        this.tail = newNode

        return this
    }

    delete(value) {
        if (!this.head) {
            return null
        }

        let deleteNode = null

        while (this.head && this.head.value === value) {
            deleteNode = this.head
            this.head = this.head.next
        }

        let currentNode = this.head

        if (currentNode !== null) {
            while (currentNode.next) {
                if (currentNode.next.value === value) {
                    deleteNode = currentNode.next
                    currentNode.next = currentNode.next.next
                } else {
                    currentNode = currentNode.next
                }
            }
        }

        if (this.tail.value === value) {
            this.tail = currentNode
        }

        return deleteNode
    }

    find(value = undefined, callback = undefined) {
        if (!this.head) {
            return null
        }
        let currentNode = this.head

        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode
            }
            if (value !== undefined && currentNode.value === value) {
                return currentNode
            }
            currentNode = currentNode.next
        }

        return null
    }

    deleteTail() {
        const deleteNode = this.tail
        if (this.head === this.tail) {
            this.head = null
            this.tail = null
            return deleteNode
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

        return deleteNode
    }

    deleteHead() {
        if (!this.head) {
            return null
        }
        const deleteNode = this.head

        if (this.head.next) {
            this.head = this.head.next
        } else {
            this.head = null
            this.tail = null
        }

        return deleteNode
    }

    fromArray(values) {
        values.map(value => this.append(value))

        return this
    }

    toArray() {
        const nodes = []

        let currentNode = this.head
        while (currentNode) {
            nodes.push(currentNode)
            currentNode = currentNode.next
        }

        return nodes
    }

    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString()
    }

    reverse() {
        let currNode = this.head
        let prevNode = null
        let nextNode = null

        while (currNode) {
            nextNode = currNode.next

            currNode.next = prevNode

            prevNode = currNode
            currNode = nextNode
        }

        this.tail = this.head
        this.head = prevNode

        return this
    }
}

const l = new LinkedList()
l.prepend(3)
l.prepend(8)

console.log(l)
let f = l.find(3)
console.log(f)

console.log(l.toArray())

console.log(l.toString(() => {
    console.log('end string')
}))

console.log(l.head.value)
l.reverse()

console.log(l.head.value)