var person = {
    name: '张三',
    age: 20
}

function defineReactive(data, key, val) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log(`读取了data 的 ${key} 属性：值为 ${val}`);
            return val
        },
        set: function (newVal) {
            console.log(`设置了data 的 ${key} 属性：值为 ${newVal}`);
            if (val === newVal) {
                return
            }
            val = newVal
        }
    })
}

for (k in person) {
    defineReactive(person, k, person[k])
}

person.name
person.age = 21