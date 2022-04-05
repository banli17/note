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


function bfs(node) {
    let nodes = []
    let queue = [node]

    while (queue.length) {
        let item = queue.shift()
        nodes.push(item)

        if (item.child) {
            queue.push(...item.child)
        }
    }
    return nodes
}

console.log(bfs(node))

/*
[ { id: '1', child: [ [Object], [Object] ] },
{ id: '1_2', child: [ [Object], [Object] ] },
{ id: '2_2', child: [ [Object], [Object] ] },
{ id: '1_2_3' },
{ id: '1_2_4' },
{ id: '2_2_3' },
{ id: '2_2_4' } ]
*/
