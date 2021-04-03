import { generate } from "./generate";
import { parseHTML } from "./parse";

export function compileToFunctions(template) {
    let ast = parseHTML(template);
    // root
    let code = generate(ast); // 生成代码

    let render = `with(this){return ${code}}`

    let fn = new Function(render); // 可以让字符串变成一个函数
    
    return fn; // render 函数已经ok了
}


