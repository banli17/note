/**
 * 特征数据存储类
 * @class
 * @constructor
 * @public
 * @author zhxi
 */
class CharactorStorage {
    /**
     * 创建特征数据存储实例
     * @param {Object} data 存储数据
     * @memberof CharactorStorage
     */
    constructor(data = {}) {
        this.ruleType = [IDRule, NameRule, ClassRule, AttrRule] // 存储类型
        this.nodes = [] // 存储类型实例
        this.init(data)
    }

    /**
     * 初始化所有规则类，如果有用户传入的数据，则分别进行数据初始化存储
     * @param {Object} data 用户传入的 存储规则以及对应数据
     * @memberof CharactorStorage
     */
    init(data) {
        this.ruleType.forEach((R, i) => {
            const newClass = new R()
            if (typeJudgment.isObject(data) && data[newClass.constructor.name]) {
                newClass.storage = data[newClass.constructor.name]
            }
            this.nodes[i] = newClass
        })
    }

    /**
     * 更新数据
     * @param {*} data
     * @memberof CharactorStorage
     */
    updateData(data = {}) {
        this.ruleType.forEach((R, i) => {
            if (typeJudgment.isObject(data) && data[R.name] && this.nodes[i]) {
                this.nodes[i].storage = data[R.name]
            }
        })
    }

    /**
     * 根据组条件设置数据
     * @param {String|Object} rule 特征值
     * @param {Path<String>} spaceName 存储空间，可传路径
     * @param {Object} data 预存数据
     * @returns {Object|Boolean} data|false 预存数据或者false
     * @memberof CharactorStorage
     */
    setData(rule, spaceName, data) {
        let returnData = false
        for (const value of this.nodes) {
            const realRule = value.constructor.tryParse(rule)
            if (realRule) {
                value.insertData(realRule)(spaceName)(data)
                returnData = data
                break
            }
        }
        return returnData
    }

    /**
     * 根据对象获取数据
     * @param {Thing.BaseObject} object ThingJS 对象
     * @param {String} spaceName 存储空间名
     * @returns {*} 返回的是用户存储的数据 或者 null
     * @memberof CharactorStorage
     */
    getData(object, spaceName) {
        let returnData = null
        for (const value of this.nodes) {
            const realRule = value.getData && value.getData(object, spaceName)
            if (realRule !== undefined) {
                returnData = realRule
                break
            }
        }
        return returnData
    }

    /**
     * 获取所有类型规则的存储数据 {IDRule: {UINO_T1_F10: {'视点规则存储': {position:[], target:[]}}}}
     * @returns {Object} object对象
     * @memberof CharactorStorage
     */
    getAllData() {
        const allObj = {}
        for (const value of this.nodes) {
            const itemData = value.storage
            const name = value.constructor.name
            if (JSON.stringify(itemData) !== '{}') {
                allObj[name] = itemData
            }
        }
        return allObj
    }

    /* istanbul ignore next */
    apply(frame) {
        frame.inject({})
    }
}

export default CharactorStorage