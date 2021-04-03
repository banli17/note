
export const nodeOps = {
    createElement(type){
       return document.createElement(type);
    },
    insert(child,parent,anchor=null){ // 调用insertBefore时如果参照物是null 表示追加元素
        parent.insertBefore(child,anchor); // achor == null appendChild
    },
    remove(child){
        const parent = child.parentNode;
        if(parent){
            parent.removeChild(child);
        }
    },
    setElementText(el,content){ // v-html
        el.textContent = content;
    },
    createTextNode(content){
        return document.createTextNode(content);
    }
}

// vue2 => weex => mpvue