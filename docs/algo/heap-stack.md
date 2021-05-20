# 堆和栈

- stack 数组或单双链表 查 O(n) 插入，删除 O(1)
- queue 数组或单双链表 查 O(n) 插入，删除 O(1)

http://www.bigocheatsheet.com/ 罗列了各种数据结构和算法时间复杂度
Big O Cheat Sheet

1. https://leetcode.com/problems/backspace-string-compare/description/ 844
1. https://leetcode.com/problems/implement-queue-using-stacks/solution/ 232
1. https://leetcode.com/problems/implement-stack-using-queues/description/ 225

- 只用栈实现队列，或只用队列实现栈
  用 input 和 output，两个 stack。如果要出队，就 pop 从 output 里出、入队 push 到 input 里。output 如果没有，就将 input 里的数据移到 output，peek 用于查看末尾的元素，看 output。

1. https://leetcode.com/problems/valid-parentheses/description/ 20

- 使用栈
  - 左 push
  - 右 peek
  - 最终看是否 empty
- do while 循环 replace () [] {}
