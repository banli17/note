// 获取所有固有对象

let objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect
]

let set = new Set(objects)

for (let i = 0; i < objects.length; i++) {
    let o = objects[i]
    for (let p of Object.getOwnPropertyNames(o)) {
        let d = Object.getOwnPropertyDescriptor(o, p)
        if ((d.value !== null && typeof d.value === 'object') || (typeof d.value === 'function')) {
            if (!set.has(d.value)) {
                set.add(d.value)
                objects.push(d.value)
            }
        }
        if (d.get) {
            if (!set.has(d.get)) {
                set.add(d.get)
                objects.push(d.get)
            }
        }
        if (d.set) {
            if (!set.has(d.set)) {
                set.add(d.set)
                objects.push(d.set)
            }
        }
    }
}

console.log(objects)  // node 439 个