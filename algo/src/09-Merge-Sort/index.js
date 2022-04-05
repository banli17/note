import { swap, SortHelper } from '@/helpers'

class MergeSort {
    @SortHelper.test(1)
    static sort(arr, compare) {
        mergeSort(arr, 0, arr.length - 1)
        return arr
    }
}

// [l, r]
function mergeSort(arr, l, r) {
    if (l >= r) return
    const mid = Math.floor(l + (r - l) / 2) // 防止越界

    // 对 [l, mid] 进行排序
    mergeSort(arr, l, mid)
    // 对 [mid+1, r] 进行排序
    mergeSort(arr, mid + 1, r)

    // 合并
    merge(arr, l, mid, r)
}

function merge(arr, l, mid, r) {
    const temp = arr.slice(l, r + 1)
    let i = l
    let j = mid + 1
    for (let k = l; k <= r; k++) {
        if (i > mid) {
            arr[k] = temp[j - l]
            j++
        } else if (j > r) {
            arr[k] = temp[i - l]
            i++
        } else if (temp[i - l] > temp[j - l]) {
            arr[k] = temp[j - l]
            j++
        } else {
            arr[k] = temp[i - l]
            i++
        }
    }
    console.log(arr.slice(l, r + 1))
}
