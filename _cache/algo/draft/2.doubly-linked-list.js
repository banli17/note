class LinkedNode {
    constructor(value, prev = null, next = null) {
        this.prev = prev
        this.next = next
        this.value = value
    }
}


class DoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    append(value) {
        let newNode = new LinkedNode(value)

        if (!this.head) {
            this.head = this.tail = newNode
            return this
        }

        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode

        return this
    }
}

module.exports = DoublyLinkedList