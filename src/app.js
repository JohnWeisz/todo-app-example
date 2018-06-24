import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createMainReducer } from "./app/todo-main-reducers";
import { createSortModeChangeMiddleware } from "./app/todo-main-middleware";
import { createTodoListReducer } from "./app/areas/list/todo-list-reducer";
import { createTodoListChangeMiddleware } from "./app/areas/list/todo-list-middleware";
import { TodoMain } from "./app/todo-main.jsx";

export class TodoApp
{
    /**
     * @param {{ getItems: () => Map<number, TodoItem>, setItems: (items: Map<number, TodoItem>) => void }} todoListProvider
     * @param {{ get: (key: string) => string, set: (key: string, value: string) => void }} settingsProvider
     */
    constructor(todoListProvider, settingsProvider)
    {
        let todoListReducerInitialState;
        let mainReducerInitialState;
        let middleWares = [];

        if (todoListProvider)
        {
            let items = todoListProvider.getItems();

            todoListReducerInitialState = {
                items: items,
                idCounter: Array.from(items.values()).reduce((a, b) => Math.max(a, b), 0) + 1 // Get greatest ID from items, set idCounter to that + 1.
            };

            middleWares.push(createTodoListChangeMiddleware(() =>
            {
                todoListProvider.setItems(this._store.getState().todoList.items);
            }));
        }

        if (settingsProvider)
        {
            mainReducerInitialState = {
                sortMode: settingsProvider.get("sort-mode")
            };

            middleWares.push(createSortModeChangeMiddleware(() =>
            {
                settingsProvider.set("sort-mode", this._store.getState().main.sortMode);
            }));
        }

        this._store = createStore(
            combineReducers({
                main: createMainReducer(mainReducerInitialState),
                todoList: createTodoListReducer(todoListReducerInitialState)
            }),
            applyMiddleware.apply(applyMiddleware, middleWares)
        );
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
