class PubSub {
  constructor() {
    this._events = {}
  }

  subscribe(event, callback) {
    if (!this._events[event]) {
      this._events[event] = []
    }
    this._events[event].push(callback)
  }

  publish(event, ...args) {
    const callbacks = this._events[event]
    callbacks?.forEach(callback => {
      callback.call(this, ...args)
    })
  }
}

let ps = new PubSub()

ps.subscribe('click', (...args) => {
  console.log('click ', ...args);
})
ps.subscribe('click', (...args) => {
  console.log('click2 ', ...args);
})
ps.publish('click', 1, 2, 3)
