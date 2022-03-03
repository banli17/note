export default class MyArray {
  // private data: any[];
  // private size: number;
  constructor(capacity = 10) {
    this.data = new Array(capacity)
    this.size = 0 // 元素的个数
  }

  // 获取数组中元素的个数
  getSize() {
    return this.size
  }

  // 获取数组的容量
  getCapacity() {
    return this.data.length
  }

  isEmpty() {
    return this.size === 0
  }

  // 在所有元素后添加元素
  addLast(e) {
    this.add(this.size, e)
  }

  addFirst(e) {
    this.add(0, e)
  }

  resize(newCapacity) {
    // 新建数组
    let newData = new Array(newCapacity)
    // 让老数组中的元素拷贝到新数组中
    for (let i = 0; i < this.size; i++) {
      newData[i] = this.data[i]
    }
    this.data = newData
  }

  // 在 index 处添加元素
  add(index, e) {
    if (index < 0 || index > this.size) // 只能在 [0, size] 区间添加
      throw new Error(`Array index required [0, ${this.data.length})`)
    // 满了，不能添加了，扩容
    if (this.size === this.data.length)
      // java 是 1.5 倍
      this.resize(this.size * 2)
    // throw new Error('Array is Full')

    // 添加，将 index 后面的元素往后移动一位
    for (let i = this.size - 1; i >= index; i--) {
      this.data[i + 1] = this.data[i]
    }
    // 设置 index 处的元素
    this.data[index] = e
    this.size++
  }

  // 只能通过 get 获取元素
  get(index) {
    // 封装，只能获取 size 内的元素
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed, Index is illegal')
    }
    return this.data[index]
  }

  // 利用 size 的判断
  getLast() {
    return this.get(this.size - 1)
  }

  getFirst() {
    return this.get(0)
  }

  set(index, e) {
    if (index < 0 || index >= this.size) {
      throw new Error('Set failed, Index is illegal')
    }
    return this.data[index] = e
  }

  // 查找索引
  find(e) {
    let index = -1
    for (let i = 0; i < this.size; i++) {
      if (this.get(i) === e) {
        index = i
        break
      }
    }
    return index
  }

  // 是否包含某个元素
  contains(e) {
    return this.find(e) !== -1
  }

  // 移除某个索引位置的元素
  remove(index) {
    if (index < 0 || index > this.size)
      throw new Error('remove index is illegal')
    let ret = this.data[index]
    for (let i = index + 1; i < this.size; i++) {
      this.data[i - 1] = this.data[i]
    }
    this.size--
    this.data[this.size] = null
    // 动态缩容
    let halfDataLen = Math.ceil(this.data.length / 2)
    if (this.size === Math.ceil(this.data.length / 4) && halfDataLen !== 0) {
      this.resize(halfDataLen)
    }
    return ret
  }

  removeFirst() {
    return this.remove(0)
  }

  removeLast() {
    return this.remove(this.size)
  }

  // 移除某个元素
  removeElement(e) {
    let index = this.find(e)
    if (index !== -1) {
      this.remove(index)
    }
  }

}

{
  let arr = new MyArray(11)
  for (let i = 0; i < 10; i++) {
    arr.addLast(i)
  }
  arr.set(1, 100)
  console.log(arr);
  console.log(arr.get(1));
  // console.log(arr.get(12));  index报错
  arr.addFirst(-1)
  console.log(arr);

  arr.remove(2)
  console.log(arr);

  arr.removeFirst()
  console.log(arr);

  arr.removeElement(2)
  console.log(arr);
  console.log(arr.find(3));
  console.log(arr.contains(3));


  console.log(arr.get(7));
  console.log(arr);
  // 增加元素时，会动态扩容
  arr.addLast('a')
  arr.addLast('b')
  arr.addLast('c')
  arr.addLast('d')
  console.log(arr);
  console.log(arr.getCapacity());
  // 删除一个元素后，容量减半
  arr.removeFirst()
  console.log(arr.getCapacity());
}
