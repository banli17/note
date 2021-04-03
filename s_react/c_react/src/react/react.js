function createElement(type, props, ...children) {
    console.log('createElement', arguments)
    return {
        type,
        props
    }
}


const React = {
    createElement
}
export default React
