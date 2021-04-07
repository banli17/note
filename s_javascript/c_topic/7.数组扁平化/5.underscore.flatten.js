/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否舍弃普通元素，如果是 true，就只处理内部是数组的了
 * @param  {Array} output  这是为了方便递归而传递的参数
 */
function flatten(input, shallow, strict, output) {
    // 递归使用的时候会用到output
    output = output || [];
    var idx = output.length;

    for (var i = 0, len = input.length; i < len; i++) {
        var value = input[i];
        // 如果是数组，就进行处理
        if (Array.isArray(value)) {
            // 如果是只扁平一层，遍历该数组，依此填入 output
            if (shallow) {
                var j = 0, length = value.length;
                while (j < length) output[idx++] = value[j++];
            }
            // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
            else {
                flatten(value, shallow, strict, output);
                idx = output.length;
            }
        }
        // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
        else if (!strict) {
            output[idx++] = value;
        }
    }
    // console.log(output)
    return output;

}

var arr1 = [1, [2, [3, 4]], [5, '6'], null, {}];
console.log(flatten(arr1, true, true))

var _ = {}
_.flatten = function (array, shallow) {
    return flatten(array, shallow, false);
};

function unique(array) {
    return Array.from(new Set(array));
}

// 只扁平一层，取并集
_.union = function () {
    return unique(flatten(arguments, true, true));
}

const union1 = _.union([1, 2, 3, [4, 5]], [101, 2, 1, 10, [4, 5]], [2, 1]);
console.log(union1) // [ 1, 2, 3, [ 4, 5 ], 101, 10, [ 4, 5 ] ]


function difference(array, ...rest) {
    rest = flatten(rest, true, true);
    return array.filter(function (item) {
        return rest.indexOf(item) === -1;
    })
}

console.log(difference([1, 2, 3, 4, 5], [5, 2, 10], [4], 3))
// [ 1, 3 ]


