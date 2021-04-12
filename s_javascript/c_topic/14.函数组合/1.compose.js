const compose = (...funcs) => {
    return (val) => {
        return funcs.reduceRight((a, b) => b(a), val);
    };
};
function add10(a) {
    return a + 10;
}
function minus5(a) {
    return a - 5;
}
const add5 = compose();
console.log(add5(20))