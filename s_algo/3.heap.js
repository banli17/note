export default class Heap {

    constructor(comparatorFunction) {
        if (new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance directly')
        }

        this.heapContainer = []
        this.compare = new Comparator(comparatorFunction)
    }

    getLeftChildIndex(parentIndex) {
        return parentIndex * 2 + 1
    }

    getRightChildIndex(parentIndex) {
        return parentIndex * 2 + 2
    }

    // 3 -> 1  4 -> 1
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2)
    }

    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0
    }

    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
    }

    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length
    }

    leftChild(parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)]
    }

    rightChild(parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)]
    }

    parent(childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)]
    }

    peek() {
        if (!this.heapContainer.length) {
            return null
        }

        return this.heapContainer[0]
    }

    heapifyUp(customStartIndex) {
        let currentIndex = customStartIndex

        while (
            this.hasParent(currentIndex)
            && this.pairIsInCorrentOrder(this.heapContainer[currentIndex], this.parent[currentIndex])
        ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex))
            currentIndex = this.getParentIndex(currentIndex)
        }
    }

    heapifyDown(customStartIndex = 0) {
        let currentIndex = customStartIndex
        let nextIndex = null

        // 有子节点
        while (this.hasLeftChild(currentIndex)) {
            if (this.hasRightChild(currentIndex) && this.pairIsInCorrentOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
                nextIndex = this.getRightChildIndex(currentIndex)
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex)
            }

            if (this.pairIsInCorrentOrder(
                this.heapContainer[currentIndex],
                this.heapContainer[nextIndex]
            )) {
                break
            }

            this.swap(currentIndex, nextIndex)
            currentIndex = nextIndex
        }

    }

}