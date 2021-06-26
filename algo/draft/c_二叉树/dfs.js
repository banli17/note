let node = {
    id: '1',
    child: [
        {
            id: '1_2',
            child: [
                {
                    id: '1_2_3'
                },
                {
                    id: '1_2_4'
                }
            ]
        },
        {
            id: '2_2',
            child: [
                {
                    id: '2_2_3'
                },
                {
                    id: '2_2_4'
                }
            ]
        }
    ]
}


function def(node) {
    let nodes = []
    let stack = [node]

    while (stack.length) {
        let item = stack.pop()
        nodes.push(item)

        console.log(item)
        if (item.child) {
            for (let i = item.child.length - 1; i >= 0; i--) {
                stack.push(item.child[i])
            }
        }
    }
}

def(node)
