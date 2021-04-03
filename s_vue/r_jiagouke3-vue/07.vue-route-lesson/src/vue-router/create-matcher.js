import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";

export default function createMatcher(routes) {

    // {/:记录,/about:记录,/about/a:'记录a','/about/b':'记录b', /user /product}
    let { pathMap } = createRouteMap(routes); // 根据用户的配置创建一个映射表


    // 动态的添加映射关系，可以实现动态路由了
    function addRoutes(routes) { // 动态添加路由权限  /user /product
        createRouteMap(routes, pathMap);
    }

    function match(path) { // 给我个路径 可以匹配路由
        // todo..
        let record = pathMap[path];
        
        return createRoute(record,{ // {path:/,matched:[{},{}]}
            path
        })
    }
    return {
        addRoutes,
        match
    }
}