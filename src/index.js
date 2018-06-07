import { TodoApp } from "./app";

export let container = document.getElementById("app-container");
export let todoApp = new TodoApp(
    {
        getItems: () =>
        {
            let todoItemsJson = localStorage.getItem("todo.items");

            if (todoItemsJson)
            {
                let todoItems = JSON.parse(todoItemsJson);

                if (todoItems && todoItems instanceof Array)
                {
                    let todoItemsMap = new Map();

                    for (let item of todoItems)
                    {
                        todoItemsMap.set(item.id, item);
                    }

                    return todoItemsMap;
                }
            }

            return new Map();
        },
        setItems: (items) =>
        {
            if (items)
            {
                localStorage.setItem("todo.items", JSON.stringify(Array.from(items.values())));
            }
            else
            {
                localStorage.setItem("todo.items", JSON.stringify([]));
            }
        }
    }
);

todoApp.render(container);
