import { MyArray } from './MyArray'

interface Stack {
  push(e);
  pop();
  getSize();
  isEmpty();
}

export class ArrayStack implements Stack {
  private data;
  constructor(capacity) {
    this.data = new MyArray(capacity)
  }

  push(e) {
    this.data.addLast(e)
  }

  pop() {
    return this.data.removeLast()
  }

  peek() {
    return this.data.getLast()
  }

  isEmpty() {
    return this.data.isEmpty()
  }

  getSize() {
    return this.data.getSize()
  }
}
