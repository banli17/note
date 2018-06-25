# 排序算法

## 目录

- [选择排序](#选择排序)
- [插入排序](#插入排序)
- [归并排序](#归并排序)


> 申明：下面的排序算法代码都是依赖自动生成数组的文件(randomArr.js)。

```
// randomArr.js
let arr = []

// 生成随机数 n 项， 从x到y的整数
// 5-10   0 - 1
const range = (n, x, y) => {
    for (let i = 0; i < n; i++) {
        let random = parseInt(Math.random() * (y - x) + x)
        arr.push(random)
    }
}

range(20, 1, 30)
module.exports = arr
```
## 选择排序

选择排序的思路是遍历数组，每次找到最小项，然后将最小项放在最前面。

1. 找最小项。假设index0是最小项，遍历[1-len]，如果indexN比index0小，则indexN是新的最小项。最终将indexN项放在第一位。
2. 找第二小项。假设index1是最小项，遍历[2-len]，如果indexN比index1小，则indexN是新的第二小项，最终将indexN放在第二位。
3. 重复找第n小项...

```
// selectionSort.js
const arr = require('./randomArr')

function selectionSort(arr) {
    let minIndex
    let len = arr.length
    let _temp = null

    for (let i = 0; i < len; i++) {
        minIndex = i // 假设最小项是此次遍历的第一项

        // 遍历剩余的数组，如果其中有比最小项还小的，那么它应该是最小项
        for (let j = i + 1; j < len; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j
            }
        }

        // 找到minIndex之后，将minIndex和原第一项交换位置
        _temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = _temp
    }
}
```

## 插入排序

插入排序是将第一项后面的每一项目标元素拿出来依次和其前面项比较，把它插入到正确位置。

以[1, 5, 3, 2] 来说明从小到大进行插入排序，操作步骤如下。

1. 将5和前面项比较。最后数组是[1, 5, 3, 2]
2. 将3和前面项比较
    1. 3和5比较，[1, 3, 5, 2]
    2. 3和1比较，[1, 3, 5, 2]
3. 将2和前面项比较
    1. 2和5比较，[1, 3, 2, 5]
    2. 2和3比较，[1, 2, 3, 5]
    3. 2和1比较，[1, 2, 3, 5]

插入排序的实现如下：

```
// insertionSort.js
const randomArr = require('./randomArr')

function insertionSort(arr) {
    for (let i = 1, len = arr.length; i < len; i++) {
        let _temp = null
        for (let j = i; j > 0; j--) {
            // arr[j]是目标元素，和前一项比较，看是否需要交换位置
            if (arr[j] < arr[j - 1]) {
                _temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = _temp
            } else {
                break
            }
        }
    }
}

insertionSort(randomArr)
console.log(randomArr)
```

现在我们来测试一下选择排序和插入排序的性能，通过在排序算法外包装一层`p_算法名`来测试。

```
const randomArr = require('./randomArr')
const selectionSort = require('./selectionSort')
const insertionSort = require('./insertionSort')


const performanceSort = (fn, arr) => {
	console.time('sort')
	fn(arr)
	console.timeEnd('sort')
}


performanceSort(insertionSort, randomArr)
performanceSort(selectionSort, randomArr)

// 在20000个1-10000个随机数情况下
// 插入排序sort: 1.854ms
// 选择排序sort: 291.030ms
```

同样是n^2算法，插入排序要比选择排序快很多，这是为什么呢？

这是因为选择排序时，数组遍历需要全部遍历完才知道元素中的最小项。而插入排序中，一旦找到合适的位置，就break跳出循环了。当数组几乎有序时，排序速度会更加快。

接下来，来优化一下插入排序，在插入的过程中，交换两个元素的位置进行了大量的操作，我们可以将目标元素复制一份，然后将复制的元素和前面项比较，如果复制项小，则将前面一项后移一位，直到复制项比前一项大时停止。

```
const randomArr = require('./randomArr')
const insertionSort1 = (arr) => {
	for (let i = 1, len = arr.length; i < len; i++) {
		let _temp = arr[i]
		let j
		for (j = i; j > 0; j--) {
			if (_temp < arr[j - 1]) {
				arr[j] = arr[j - 1]
			} else {
				break
			}
		}
		arr[j] = _temp
	}
}
module.exports = insertionSort1
```
经过测试，按照这个思路优化过的算法，反而比直接交换的算法要慢一些。(这个不知道怎么回事？)

## 归并排序


排序基础 2-1 选择排序法 2-2 使用模板（泛型）编写算法 2-3 随机生成算法测试用例 2-4 测试算法的性能 2-5 插入排序法 2-6 插入排序法的改进 2-7 更多关于 O（n\*2）排序算法的思考第三章：高级排序问题 3-1 归并排序法 3-2 归并排序法的实现 3-3 归并排序法的优化 3-4 自底向上的归并排序算法 3-5 快速排序法 3-6 随机化快速排序法 3-7 双路快速排序法 3-8 三路快速排序法 3-9 归并排序和快速排序的衍生问题
