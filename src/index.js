import { TodoApp } from "./app";
import { mapToJson } from "./utils/map-to-json";
import { jsonToMap } from "./utils/json-to-map";

export let container = document.getElementById("app-container");
export let todoApp = new TodoApp(
    {
        getItems: () => jsonToMap(localStorage.getItem("todo.items"), (item) => item.id),
        setItems: (items) => localStorage.setItem("todo.items", mapToJson(items))
    },
    {
        get: (key) => localStorage.getItem("settings." + key),
        set: (key, value) => localStorage.setItem("settings." + key, value)
    }
);

todoApp.render(container);
