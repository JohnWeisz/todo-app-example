/**
 * @alias StoreState
 */
export const todoListInitialState = {
    /** @type {TodoItem} */
    newItemTemp: {
        title: "",
        isHighPriority: false,
        deadline: -1
    },

    /** @type {Map<number, TodoItem>} */
    items: new Map(),

    /** @type {Number} */
    idCounter: 0
};

todoListInitialState.items.set(0, {
    id: 0,
    title: "Sketch todo-app",
    description: "Create the necessary diagrams, basic design concepts, and tech requirements for the todo app.",
    deadline: Date.now() + 60000,
    isDone: false
});

todoListInitialState.items.set(1, {
    id: 1,
    title: "Design todo-app UI & UX",
    description: "Sketch and detail how the todo-app will look, and how it will function from the large picture.",
    deadline: Date.now() + 600000,
    isDone: false,
    isHighPriority: true
});

todoListInitialState.items.set(2, {
    id: 2,
    title: "Finish todo-app",
    description: "Implement ideas and finish the todo-app.",
    deadline: Date.now() + 1800000,
    isDone: false
});

todoListInitialState.idCounter = todoListInitialState.items.size;
