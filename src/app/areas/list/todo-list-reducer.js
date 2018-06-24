import { mapConcatImmutable, mapSetImmutable, mapDeleteImmutable, mapFilterImmutable } from "../../../utils/map-immutable";
import { todoListInitialState } from "./todo-list-state";

export function createTodoListReducer(initialState)
{
    if (initialState)
    {
        initialState = {
            ...todoListInitialState,
            ...initialState
        };
    }
    else
    {
        initialState = todoListInitialState;
    }

    // The reducer function itself.
    return (state = initialState, action) =>
    {
        switch (action.type)
        {
            case "TODO_LIST_ADD":
                let idOfNewItem = state.idCounter || 0;

                /** @type {TodoItem} */
                const newTodoItem = {
                    title: action.payload.title,
                    description: "",
                    deadline: (action.payload.deadline > Date.now()) ? action.payload.deadline : -1,
                    isDone: false,
                    id: idOfNewItem,
                    isHighPriority: action.payload.isHighPriority
                };

                return {
                    ...state,
                    idCounter: (state.idCounter || 0) + 1,
                    items: mapSetImmutable(state.items, idOfNewItem, newTodoItem),
                    newItemTemp: {
                        // We've added the new item, clear the new item field.
                        title: "",
                        deadline: -1,
                        isHighPriority: false
                    }
                };

            case "TODO_LIST_UPDATE":
                if (!state.items.has(action.payload.id)) break;

                return {
                    ...state,
                    items: mapSetImmutable(state.items, action.payload.id, {
                        ...state.items.get(action.payload.id),
                        ...action.payload
                    })
                };

            case "TODO_LIST_REMOVE":
                return {
                    ...state,
                    items: mapDeleteImmutable(state.items, action.payload.id)
                };

            case "TODO_LIST_SET_DONE":
            case "TODO_LIST_SET_UNDONE":
                if (!state.items.has(action.payload.id)) break;

                /** @type {TodoItem} */
                const doneTodoItem = {
                    ...state.items.get(action.payload.id),
                    isDone: (action.type === "TODO_LIST_SET_DONE")
                };

                return {
                    ...state,
                    items: mapSetImmutable(state.items, action.payload.id, doneTodoItem)
                };

            case "TODO_LIST_NEW_CHANGE":
                return {
                    ...state,
                    newItemTemp: {
                        ...state.newItemTemp,
                        title: action.payload.title,
                        deadline: action.payload.deadline,
                        isHighPriority: action.payload.isHighPriority
                    }
                };

            case "TODO_LIST_CLEAR_DONE":
                return {
                    ...state,
                    items: mapFilterImmutable(state.items, (value) => !value.isDone)
                };
        }

        return state;
    }
}
