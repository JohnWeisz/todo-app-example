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
