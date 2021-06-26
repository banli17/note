/**
 *
 *  给出一颗树节点定义如下：
 *
 *  interface TreeNode {
 *    value: any
 *    left?: TreeNode
 *    right?: TreeNode
 *  }
 *
 *  要求，获取二叉树的深度，例如：如下树深度为 3
 *
 *       3
 *      / \
 *      9  20
 *        /  \
 *      15   7
 *
 **/
function maxDepth2(treeNode) {
  if (!treeNode) return 0
  //在这里实现
  let leftDepth = 0, rightDepth = 0, leftSon = treeNode.left, rightSon = treeNode.right
  if (leftSon) {
    leftDepth = maxDepth(leftSon)
  }
  if (rightSon) {
    rightDepth = maxDepth(rightSon)
  }
  return leftDepth > rightDepth ? leftDepth + 1 : rightDepth + 1
}

// 广度优先， 有child 就 +1
function maxDepth(treeNode) {
  if (!treeNode) return 0
  let depth = 0
  let stack = [treeNode]
  while (stack.length) {
    console.log('层', stack.length);
    depth++
    for (let i = 0; i < stack.length; i++) {
      let item = stack[i]
      // 1. 放层数据之前将上一层的 pop 掉
      stack.pop()
      // 2. 每次往 stack 里放入一层的数据
      // console.log(item, stack);
      if (item.left) stack.push(item.left)
      if (item.right) stack.push(item.right)
      console.log(stack.length);
    }
  }

  return depth
}


const treeNode = {
  value: 10,
  left: {
    value: 8,
    left: {
      value: 15
    },
    right: {
      value: 7,
      left: {
        value: 8
      }
    }
  },
  right: {
    value: 9
  }
}
console.log(maxDepth(treeNode))
