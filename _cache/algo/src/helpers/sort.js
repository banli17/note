import { Mock } from './mock'
import _ from 'lodash'
export class SortHelper {
  static compare(a, b) {
    return a - b
  }

  static isSorted(arr, compare = SortHelper.compare) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (compare(arr[i], arr[i + 1]) > 0) {
        return false
      }
    }
    return true
  }

  static test(immediate, logger = true) {
    return (target, name, descriptor) => {
      if (logger) {
        let oldValue = descriptor.value
        descriptor.value = function (...args) {
          // console.log('排序前: ', arr.toString());
          const prev = performance.now()

          if (!args[1]) {
            args[1] = SortHelper.compare
          }
          let compare = args[1]
          // 设置默认排序算法

          let originArr = _.cloneDeep(args[0])

          let sortedArr = oldValue.apply(this, args)
          const now = performance.now()
          // console.log('排序后数据: ', sortedArr);

          let isSorted = SortHelper.isSorted(sortedArr, compare)

          if (!_.isEqual(originArr.sort(compare), sortedArr)) {
            console.error('排序后数组和原数组不相等', originArr, sortedArr,)
          }
          if (!isSorted) {
            console.error('排序算法错误了', sortedArr,)
          } else {
            // 类.方法名: n = 数据规模，time = 时间
            console.log(`%c${target.name}.${name} %c: n = ${args[0].length}，time = %c${((now - prev) / 1000).toFixed(5)}s%c，%s ${sortedArr.toString()}`, 'color:red', '', 'color:green', '', '数据')
          }

          return sortedArr
        }
      }

      // i = immediate
      if (immediate === 1) {
        descriptor.value(Mock.getRandomIntArray());

        //descriptor.value(Mock.getRandomObjectArray(), (a, b) => b.num - a.num);
      }
      return descriptor
    }
  }
}
