import { swap, Mock, SortHelper } from '@/helpers'
// 原地排序是找到最小，和前面的交换位置

class SelectionSort {
  // 方法1,循环不变量是: arr[0, i) 已经排序 arr[i...n) 没排序
  @SortHelper.test(1)
  static sort(arr, compare) {
    let len = arr.length
    for (let i = 0; i < len; i++) {
      let minIndex = i
      for (let j = i + 1; j < len; j++) {
        if (compare(arr[minIndex], arr[j]) > 0) {
          minIndex = j
        }
      }
      if (i !== minIndex) {
        swap(arr, i, minIndex)
      }
    }
    return arr
  }

  // 方法2，循环不变量是 arr[0, i) 没排序 arr[i...n) 已经排序
  @SortHelper.test(1)
  static sortB(arr, compare) {
    let len = arr.length
    for (let i = len - 1; i >= 0; i--) {
      let maxIndex = i
      for (let j = i; j >= 0; j--) {
        if (compare(arr[maxIndex], arr[j]) < 0) {
          maxIndex = j
        }
      }
      swap(arr, i, maxIndex)
    }
    return arr
  }
}

// SelectionSort.sort(Mock.getRandomIntArray(), (a, b) => a - b);
// SelectionSort.sort(Mock.getRandomObjectArray(), (a, b) => b.num - a.num);
