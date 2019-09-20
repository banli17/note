# 链表

## Linked List

为了解决数组的插入和删除操作时间复杂度高的问题。

head tail 最后一个节点的 next 指向 null

- 插入: 前一个节点的 next 指向插入元素，插入元素的 next 指向下一个节点。时间复杂度是 O(1)
- 删除: 前一个节点的 next 指向要删除元素的下个节点。时间复杂度是 O(1)

但是查找的时间为 O(n)。

## 双向链表

- lookup: O (n)
- 插入: O(1) insert prepend append
- 删除: O(1) delete
- 空间复杂度 O(n)

练习题：

1. https://leetcode.com/problems/reverse-linked-list/ 206

- 方法 1 迭代法
- 方法 2 递归
- 方法 3 es6 https://leetcode.com/problems/reverse-linked-list/discuss/313728/Javascript-ES6-less-code-solution

2. https://leetcode.com/problems/linked-list-cycle 141

新建节点进行迭代：https://leetcode.com/problems/swap-nodes-in-pairs/discuss/284762/js-solution-faster-than-100

- 暴力法，循环等 1s 没相遇就没有环
- 将前面节点记录一下，然后查找。
- 快慢指针: https://leetcode.com/problems/linked-list-cycle/discuss/371507/Javascript-Solutions-(using-Set-slow-and-fast-pointers)

3. https://leetcode.com/problems/swap-nodes-in-pairs 24

- 加一个头节点，防止赋值导致节点断裂的问题

4. https://leetcode.com/problems/linked-list-cycle-ii
5. https://leetcode.com/problems/reverse-nodes-in-k-group/
