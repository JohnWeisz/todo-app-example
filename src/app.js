import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { mainReducer } from "./app/todo-main-reducers";
import { createTodoListReducer } from "./app/areas/list/todo-list-reducer";
import { TodoMain } from "./app/todo-main.jsx";

export class TodoApp
{
    /**
     * @param {{ getItems: () => Map<number, TodoItem>, setItems: (items: Map<number, TodoItem>) => void }} todoListProvider
     * @param {{ get: (key: string) => string, set: (key: string, value: string) => void }} settingsProvider
     */
    constructor(todoListProvider, settingsProvider)
    {
        this._store = createStore(combineReducers({
            main: mainReducer,
            todoList: createTodoListReducer(todoListProvider ? { items: todoListProvider.getItems() } : undefined)
        }));

        if (todoListProvider)
        {
            window.setInterval(() =>
            {
                todoListProvider.setItems(this._store.getState().todoList.items);
            }, 2000);
        }
    }

    /**
     * @param {HTMLElement} container
     */
    render(container)
    {
        let mainComponent = React.createElement(TodoMain);
        let mainComponentWithProvider = React.createElement(Provider, { store: this._store }, mainComponent);

        ReactDOM.render(mainComponentWithProvider, container);
    }
}
