function rebuildLists(ary, key, keyNum) {
    var newAry = []
    ary.map(function(a, aIndex) {
        var start = 0
        var end = keyNum
        var len = Math.ceil(a[key].length / keyNum)
        newAry[aIndex] = JSON.parse(JSON.stringify(a))
        delete newAry[aIndex][key]

        for (var i = 0; i < len; i++) {
            var newKey = a[key].slice(start, end)

            newAry[key] = newKey
            start = end + 1
            end += keyNum
        }
        return a
    })
    return newAry
}

var arr = [
    { products: [1, 2, 3, 4, 5, 6, 78, 9] },
    { products: [1, 2, 3, 4, 5, 6, 78, 9] }
]
console.log(rebuildLists(arr, "products", 3))
