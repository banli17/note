class LinkedListNode {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    // 追加一个元素
    append(value) {
        let newNode = new LinkedListNode(value, null)

        if (!this.head) {
            this.head = newNode
            this.tail = newNode
            return
        }

        this.tail.next = newNode
        this.tail = newNode
    }

    // 前面加一个元素
    prepend(value) {
        let newNode = new LinkedListNode(value, this.head)
        this.head = newNode

        if (!this.tail) {
            this.tail = newNode
        }

        return this
    }

    size() {

    }

    toArray() {

    }

    // 搜索，时间复杂度是 O(n)
    find(value) {
        let currentNode = this.head

        while (currentNode) {
            if (value === currentNode.value) {
                return currentNode
            }
            currentNode = currentNode.next
        }

        return -1
    }

    // 删除元素
    delete(value) {
        if (!this.head) {
            return null
        }

        let deleteNode = null

        if (this.head && this.head.value === value) {
            deleteNode = this.head
            this.head = this.head.next
        }

        let currentNode = this.head
        if (currentNode !== null) {

        }

        return deleteNode
    }

}