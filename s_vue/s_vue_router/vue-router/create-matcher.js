import createRouteMap from './create-route-map'
import {createRoute} from './history/base'
// 将 options 转换为 {path: routerInfo 的数据}

/**
 * 1. addRoute: 动态添加路由
 * 2. match: 传入 path，返回对应的路由信息
 */
export default function createMatcher(routes) {
    let {pathMap} = createRouteMap(routes)
    console.log(pathMap)

    function addRoutes(routes) {
        createRouteMap(routes, pathMap)
    }

    function match(location) {
        // record 时当前的路由信息
        let record = pathMap[location]
        if (record) {
            return createRoute(record, {
                path: location
            })
        }

        return createRoute(null, {
            path: location
        })
    }

    return {
        addRoutes,
        match
    }
}
