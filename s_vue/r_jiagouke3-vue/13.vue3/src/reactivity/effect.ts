export const effect = (fn, options = {}) => {
    // 需要让传递来的fn 变成响应式的effect，数据有变化 这个fn就能重新执行
    const effect = createReactiveEffect(fn); //fn用户传递的函数
    effect();
}

// effect 应该和数据关联起来


export const effectStack = [];
function createReactiveEffect(fn) {
    const effect =  function reactiveEffect() {

        effectStack.push(effect);

        fn(); // 让函数执行
    }
    return effect;
}