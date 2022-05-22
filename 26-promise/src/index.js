const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  state = PENDING
  value = undefined // 成功的值
  reason = undefined // 失败的原因
  successCallback = []
  failCallback = []

  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(new TypeError(`executor error:`, e))
    }
  }

  resolve = (value) => {
    if (this.state !== PENDING) {
      return
    }
    this.state = FULFILLED
    this.value = value

    console.log('this.successCallback.', this.successCallback);
    // 异步情况
    if (this.successCallback) {
      while (this.successCallback.length) {
        this.successCallback.shift()(this.value)
      }
    }
  }

  reject = (reason) => {
    if (this.state !== PENDING) {
      return
    }
    this.state = REJECTED
    this.reason = reason

    if (this.failCallback) {
      while (this.failCallback.length) {
        this.failCallback.shift()(this.value)
      }
    }
  }

  then(successCallback, failCallback) {
    // 值穿透
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => reason

    let promise2 = new MyPromise((resolve, reject) => {
      console.log('xx', this.state);
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            // 如果 x 是普通值，直接 resolve
            // 如果 x 是 promise, 查看 promise 对象返回的结果, 再根据结果决定调用 resolve 或 reject
            // resolve(x) // x 值会作为 链式的 then 的参数值
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0) // 延迟是为了能够拿到 promise2
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else {
        // pending 状态，说明 有异步， 存储回调
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0) // 延迟是为了能够拿到 promise2
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }

  static all(arr) {
    let result = []
    let index = 0

    return new MyPromise((resolve, reject) => {
      function addData(key, val) {
        result[key] = val
        index++
        if (index === arr.length) {
          resolve(result)
        }
      }

      for (let i = 0; i < arr.length; i++) {
        let current = array[i]
        if (current instanceof MyPromise) {
          current.then(val => {
            addData(i, val)
          }, reason => {
            reject(reason)
          })
        } else {
          addData(i, current)
        }
      }
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }
    return new Promise(resolve => resolve(value))
  }

  catch (failCallback) {
    return this.then(undefined, failCallback)
  }
  //
  finally(callback) {
    return this.then((value) => {
      // 给下一个 then 成功回调
      // 要等 callback 执行完后返回
      return MyPromise.resolve(callback(value)).then(() => value)
    }, reason => {
      return MyPromise.resolve(callback(value)).then(() => {
        throw reason
      })
      // throw reason // 给下一个 then 失败回调
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    // then 方法的返回值 不能作为 then 内部的返回值
    return reject(new TypeError(`循环调用了 promise`))
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject) // promise
  } else {
    resolve(x) // 普通值
  }
}

module.exports = MyPromise
