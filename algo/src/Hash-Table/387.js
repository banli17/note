function firstUnique(str) {
    let arr = []
    const aCode = 'a'.charCodeAt(0)
    for (let i = 0; i < str.length; i++) {
        const index = str.charCodeAt(i) - aCode
        if (!arr[index]) arr[index] = 0
        arr[index]++
    }
    for (let i = 0; i < str.length; i++) {
        const index = str.charCodeAt(i) - aCode
        if (arr[index] === 1) return i
    }
    return -1
}


console.log(firstUnique("leetcode"))
console.log(firstUnique("loveleetcode"))
console.log(firstUnique("aabb"))