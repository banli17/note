export const isObject = (val:unknown):val is Object => typeof val == 'object' && val !== null;

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (target,key) => hasOwnProperty.call(target,key);


export const isArray = (target)=> Array.isArray(target);


export const hasChange = (oldVal,newVal)=>oldVal !== newVal;


export const isFunction = (val) => typeof val == 'function'