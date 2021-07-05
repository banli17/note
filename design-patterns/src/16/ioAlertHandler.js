const AlertHandler = require('./alertHandler')

// 负责处理具体的 check 逻辑
class IOAlertHandler extends AlertHandler {
    constructor(...props) {
        super(...props)
    }

    check(statInfo) {
        if (statInfo.io > this.rule.io) {
            this.notify.warn('io 爆了')
        } else {
            this.notify.warn('io 正常')
        }
    }
}
module.exports = IOAlertHandler