// 参数不够时继续柯里化，否则执行函数
const _ = {}
const curry = function (fn, ...curArgs) {
    // 用来记录坑位
    return function (...args) {
        // 这里要做的是如果发现了 _ ，需要用后面的参数来填补位置
        let allArgs = [...curArgs, ...args]
        // console.log(allArgs, filterCurArgsLen)
        // 如果没有坑位
        if (args.indexOf(_) === -1) {
            let copyArgs = args.slice(0)
            let j = 0
            console.log('xxx', allArgs, args)
            allArgs.forEach((item, i) => {
                if (item === _ && j < copyArgs.length) {
                    if (copyArgs[j] === _) {
                        j++
                    } else {
                        allArgs[i] = copyArgs[j++]
                        allArgs.pop()
                    }
                }
            })
            console.log('yyy', allArgs, args)
        }
        const filterCurArgsLen = allArgs.filter(item => item !== _).length
        if (fn.length > filterCurArgsLen) {
            return curry.call(this, fn, ...allArgs)
        } else {
            return fn.apply(this, allArgs)
        }
    }
}

var fn = curry(function (a, b, c, d, e) {
    console.log([a, b, c, d, e]);
});

// 验证 输出全部都是 [1, 2, 3, 4, 5]
// fn(1, 2, 3, 4, 5);
// fn(_, 2, 3, 4, 5)(1);
// fn(1, _, 3, 4, 5)(2);
fn(1, _, 3)(_, 4)(2)(5);
// fn(1, _, _, 4)(_, 3)(2)(5);
// fn(_, 2)(_, _, 4)(1)(3)(5)
