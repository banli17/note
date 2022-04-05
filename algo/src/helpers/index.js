export * from './mock'
export * from './sort'

export function swap(arr, x, y) {
  let tmp = arr[x]
  arr[x] = arr[y]
  arr[y] = tmp
}

export function isEqual(a, b) {
  return a.sort((a, b) => a - b).toString() === b.sort((a, b) => a - b).toString()
}
// Array(3) empty * 3
// Array.from(new Array(n)) undefined *3
export function createRandomData(n, max) {
  return Array.from(new Array(n)).map(x => {
    return Math.floor(Math.random() * max)
  })
}
/**
 * 查找数组中的最小值
 * @param {*} arr 数组
 * @param {*} start 查找的起始位置
 * @returns
 */
export function findMinIndex(arr, start, compare) {
  let minIndex = start
  let len = arr.length
  for (let i = start + 1; i < len; i++) {
    if (compare(arr[minIndex], arr[i]) > 0) {
      minIndex = i
    }
  }
  return minIndex
}
