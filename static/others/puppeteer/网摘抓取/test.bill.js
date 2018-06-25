var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

var newA = []
var index = 0
function sArr(a, num) {
    var len = a.length / num
    var start = 0
    var end = num
    for (var i = 0; i < len; i++) {
        if (!newA[i]) newA[i] = []
        newA[i].push(a.slice(start, end))
        start = end + 1
        end = end + num
    }
    return newA
}
// function sArr(a, num) {
//     for (var i = 0; i < a.length; i++) {
//         index = i < num ? 0 : Math.floor(i / num)
//         if (!newA[index]) {
//             newA[index] = []
//         }
//         newA[index].push(a[i])
//     }
//     return newA
// }

console.log(sArr(a, 6))
