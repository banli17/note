let DoublyLinkedList = require('./2.doubly-linked-list')


describe('test doubly linked list', () => {
    test('test', () => {
        let d = new DoublyLinkedList()

        for (let i = 0; i < 100; i++) {
            let t = d.append(i)
            expect(t.head.value).toBe(i)
            if (i == 0) {
                expect(t.prev.value).toBe(i - 1)
                return
            }
        }
    })
})