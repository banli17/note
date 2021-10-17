const AlertRule = require('./alertRule')
const Alert = require('./alert')
const Notify = require('./notify')
const IOAlertHandler = require('./ioAlertHandler')
const MemoryAlertHandler = require('./memoryAlertHandler')

// 负责组装 alert
class Application {
    constructor() {
        this.alertRule = new AlertRule()
        this.alert = new Alert()
        this.notify = new Notify()
        this.alert.addAlertHandler(new MemoryAlertHandler(this.alertRule, this.notify))
        this.alert.addAlertHandler(new IOAlertHandler(this.alertRule, this.notify))
    }

    getAlert() {
        return this.alert
    }
}

module.exports = Application