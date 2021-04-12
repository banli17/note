var _ = {};

function partial(fn, ...pArgs) {
    return function (...args) {
        let position = 0
        for (let i = 0; i < pArgs.length; i++) {
            if (pArgs[i] === _) {
                pArgs[i] = args[position++]
            }
        }
        if (position < args.length) pArgs = pArgs.concat(args.slice(position))
        return fn.call(this, ...pArgs)
    }
}

var subtract = function (a, b) {
    return b - a;
};
subFrom20 = partial(subtract, _, 20);
console.log(subFrom20(5));
