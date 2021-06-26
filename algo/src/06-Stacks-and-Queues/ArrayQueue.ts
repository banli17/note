import MyArray from '../05-Arrays/MyArray'

interface Queue {
  getSize(): number;
  isEmpty(): boolean;
  enqueue(e: any): void;
  dequeue(): any;
  getFront(): any;
}

export default class ArrayQueue implements Queue {
  private array: MyArray;
  constructor(capacity: number) {
    this.array = new MyArray(capacity)
  }

  getSize() {
    return this.array.getSize()
  }

  isEmpty() {
    return this.array.isEmpty()
  }

  getCapacity() {
    return this.array.getCapacity()
  }

  enqueue(e: any): void {
    this.array.addLast(e)
  }

  dequeue(): any {
    return this.array.removeFirst()
  }

  getFront() {
    return this.array.getFirst()
  }
}
