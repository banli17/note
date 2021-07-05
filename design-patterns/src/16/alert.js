// 负责管理 handler，处理 check 逻辑
class Alert {
    constructor() {
        this.handlerList = []
    }

    addAlertHandler(instance) {
        this.handlerList.push(instance)
    }

    check(apiStatInfo) {
        for (let i = 0; i < this.handlerList.length; i++) {
            this.handlerList[i].check(apiStatInfo)
        }
    }
}
module.exports = Alert