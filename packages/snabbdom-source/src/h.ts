import { vnode, VNode, VNodeData } from "./vnode";
import * as is from "./is";

export type VNodes = VNode[];
export type VNodeChildElement =
  | VNode
  | string
  | number
  | String
  | Number
  | undefined
  | null;
export type ArrayOrElement<T> = T | T[];
export type VNodeChildren = ArrayOrElement<VNodeChildElement>;

/**
给 vnode 节点的 data 增加 ns 属性
addNS({
    on: {click:()=>{}}, 
    ns: "http://www.w3.org/2000/svg"
  },
  ['hello', { data: {}, sel, children} as VNode],
  'svg'
) 
**/
export function addNS(
  data: any,
  children: Array<VNode | string> | undefined,
  sel: string | undefined
): void {
  data.ns = "http://www.w3.org/2000/svg";
  if (sel !== "foreignObject" && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      if (typeof child === "string") continue;
      const childData = child.data;
      if (childData !== undefined) {
        addNS(childData, child.children as VNodes, child.sel);
      }
    }
  }
}

// h 函数返回一个 Vnode
// h('div.x')
export function h(sel: string): VNode;
// h('div.x', { styles: {}, on: {}})
export function h(sel: string, data: VNodeData | null): VNode;
// h('div.x', ['hello', 3, new String(3), Vnode,...])
export function h(sel: string, children: VNodeChildren): VNode;
// h('div.x', { styles: {}, on: {}}, ['hello', 3, new String(3), Vnode,...])
export function h(
  sel: string,
  data: VNodeData | null,
  children: VNodeChildren
): VNode;
// 兼容上面的几种写法
export function h(sel: any, b?: any, c?: any): VNode {
  let data: VNodeData = {};
  let children: any;
  let text: any;
  let i: number;
  if (c !== undefined) {
    if (b !== null) {
      data = b;
    }
    if (is.array(c)) { // c 是数组
      children = c;
    } else if (is.primitive(c)) { // c 是 string 或 number
      text = c.toString();
    } else if (c && c.sel) { // c 是 VNode
      children = [c];
    }
  } else if (b !== undefined && b !== null) {
    if (is.array(b)) {
      children = b;
    } else if (is.primitive(b)) {
      text = b.toString();
    } else if (b && b.sel) {
      children = [b];
    } else { // b 是对象 { on: {}, ...}
      data = b;
    }
  }
  // 将 children 每一项都转成 VNode
  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i]))
        children[i] = vnode(
          undefined,
          undefined,
          undefined,
          children[i],
          undefined
        );
    }
  }

  // 如果是 svg，创建 svg
  // h('svg') h('svg.x') h('svg#x')
  if (
    sel[0] === "s" &&
    sel[1] === "v" &&
    sel[2] === "g" &&
    (sel.length === 3 || sel[3] === "." || sel[3] === "#")
  ) {
    addNS(data, children, sel);
  }


  return vnode(sel, data, children, text, undefined);
}

/**
 * @experimental
 */
export function fragment(children: VNodeChildren): VNode {
  let c: any;
  let text: any;

  if (is.array(children)) {
    c = children;
  } else if (is.primitive(c)) {
    text = children;
  } else if (c && c.sel) {
    c = [children];
  }

  if (c !== undefined) {
    for (let i = 0; i < c.length; ++i) {
      if (is.primitive(c[i]))
        c[i] = vnode(undefined, undefined, undefined, c[i], undefined);
    }
  }

  return vnode(undefined, {}, c, text, undefined);
}
