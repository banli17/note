import { swap, SortHelper } from '@/helpers'

class InsetionSort {
  @SortHelper.test(1)
  static sort(arr, compare) {
    for (let i = 0; i < arr.length; i++) {
      // 1. 从后往前在 [0, i) 内找合适元素
      for (let j = i; j >= 1; j--) {
        // 2. 将 j 和 j-1 进行比较
        if (compare(arr[j], arr[j - 1]) < 0) {
          swap(arr, j, j - 1)
        } else {
          break
        }
      }
      // 上面代码等价于
      // for (let j = i; j >= 1 && compare(arr[j], arr[j - 1]) < 0; j--) {
      //   swap(arr, j, j - 1)
      // }
    }
    return arr
  }

  // 小优化，通过赋值替换交换位置
  @SortHelper.test(1)
  static sort2(arr, compare) {
    for (let i = 0; i < arr.length; i++) {
      // 1. 从后往前在 [0, i) 内找合适元素
      let t = arr[i]
      let j
      for (j = i; j - 1 >= 0 && compare(t, arr[j - 1]) < 0; j--) {
        arr[j] = arr[j - 1]
      }
      arr[j] = t
    }
    return arr
  }

  // 循环不变量 a(i, n) 是有序的 a[0, i] 是无序的
  @SortHelper.test(1)
  static sort3(arr, compare) {
    for (let i = arr.length - 1; i >= 0; i--) {
      // 1. 从后往前在 [0, i) 内找合适元素
      // a(i, n) 是有序的 a[0, i] 是无序的
      let t = arr[i]
      let j
      // 遍历 a[i, n]
      // 3 1 | 05 6
      for (j = i; j + 1 < arr.length && compare(t, arr[j + 1]) > 0; j++) {
        arr[j] = arr[j + 1]
      }
      arr[j] = t
    }
    return arr
  }
}
