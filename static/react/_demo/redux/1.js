const data = {
    todos: [
        {
            id: 1,
            title: 'eat food',
            completed: true
        },
        {
            id: 2,
            title: 'exercise',
            completed: false
        }
    ],
    visibilityFilter: 'SHOW_COMPLETED'
}


function todos(state=[], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([{id: 3, title: 'walk', completed: false}])
        case 'TOGGLE_TODO':
            return state.map((todo, index) =>
            index == action.index
                ? {text: todo.text, completed: !todo.completed}
                : todo
        )
        default:
            return state
    }
}

const a = todos(data.todos, {
    type: 'ADD_TODO'
})

const b = todos(data.todos, {
    type: 'TOGGLE_TODO'
})

console.log(b)
