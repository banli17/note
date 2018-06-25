# Node

## Node简介

html树会渲染成 dom树，而dom树正是一个个Node的实例，dom树的顶层是document节点，它表示整个文档。它的根节点(root node)是 <html>。

名称 | nodeType |nodeName | nodeValue
----|------|---- | ----
ELEMENT_NODE| 1| 大写的标签名 'DIV' | null
ATTRIBUTE_NODE | 2 | 属性名 | 属性值
TEXT_NODE | 3 | #text | 文本的值
COMMENT_NODE| 8 | #comment| 注释的文本，<!-- -->内的值
DOCUMENT_NODE| 9 | #document | null
DOCUMENT_TYPE_NODE | 10 | html,根据<!DOCTYPE html>来的 | null
DOCUMENT_FRAGMENT_NODE | 11 | #document-fragment | null

## 节点关系

除了根节点，其它节点对于周围的节点都存在三种关系。

父节点关系：parentNode
子节点关系：childNodes
同级节点关系：sibling

DOM 提供操作接口，用来获取三种关系的节点。其中，子节点接口包括 firstChild、lastChild 等属性，同级节点包括nextSibling 、previousSibling 属性。