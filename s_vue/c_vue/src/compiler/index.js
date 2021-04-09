import parseHTML from "./html-parser";
import {generate} from './generate'

export function compileToFunction(template) {
    // 1. 将 html 转为 ast 语法树
    let ast = parseHTML(template)
    console.log('ast', ast)

    // 2. 优化静态节点

    // 3. 将 ast 生成为代码
    let code = generate(ast)

    // 生成函数
    let render = new Function(`with(this){return ${code}}`)

    console.log(render)
    return render
}
