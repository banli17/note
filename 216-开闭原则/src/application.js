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
    this.notify = new Notify() // 可以设置各种通知策略, 如打印, 写文件, 发邮件等

    this.alert.addAlertHandler(new MemoryAlertHandler(this.alertRule, this.notify))
    this.alert.addAlertHandler(new IOAlertHandler(this.alertRule, this.notify))
  }

  getAlert() {
    return this.alert
  }
}

module.exports = Application
