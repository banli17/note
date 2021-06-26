# 选择排序法

排序算法是让数据变成有序的算法。

## 简介

选择排序法的思想是：

1. 先把最小的拿出来
2. 剩下的，再把最小的拿出来
3. 剩下的，再把最小的拿出来
4. 重复...

这样，排序过程中会新建一个数组用来存放那些最小的元素，空间复杂度是 `O(n)`，时间复杂度是每次查找最小元素的时间 `n+(n-1)+...+1`,即 `O(n^2)`。

选择排序可以进行原地排序，思想是：将数组分为排好序区间`a[0, i)`和未排序区间`a[i, n)`。从 `a[i, n)`中找到最小的元素`a[x]`，然后与`a[i]`交换位置，那么 `a[0, i+1)` 就是有序区间了，以此循环。

```js
class SelectionSort {
  @logger()
  static sort(arr, compare = defaultCompare) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      let minIndex = i;
      for (let j = i + 1; j < len; j++) {
        if (compare(arr[minIndex], arr[j]) > 0) {
          minIndex = j;
        }
      }
      if (i !== minIndex) {
        swap(i, minIndex, arr);
      }
    }
    return arr;
  }
}

console.log(SelectionSort.sort([10, 2, 5, 10], (a, b) => a - b));
console.log(
  SelectionSort.sort(
    [
      { name: "z", score: 100 },
      { name: "b", score: 20 },
      { name: "a", score: 30 },
    ],
    (a, b) => b.score - a.score
  )
);
```

## 作业

1. 实现循环不变量为 `a[0,i)`有序，`a[i, n)`无序的插入排序
2. 实现循环不变量为 `a[0,i)`无序，`a[i, n)`有序的选择排序
