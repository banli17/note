export default function createRouteMap(routes, oldPathMap) {
    let pathMap = oldPathMap || Object.create(null)

    routes.forEach(route => {
        addRouteRecord(route, pathMap)
    })
    return {
        pathMap
    }
}

function addRouteRecord(route, pathMap, parent) {
    // console.log('parentpath:', route, parent && parent.path)
    let path = parent ? (parent.fullPath + '/' + route.path) : route.path
    route.fullPath = path
    let record = {
        path,
        component: route.component,
        parent,
    }
    if (!pathMap[path]) {
        pathMap[path] = record
    }
    if (route.children) {
        route.children.forEach(childRoute => {
            addRouteRecord(childRoute, pathMap, route)
        })
    }
}




























