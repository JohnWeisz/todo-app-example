export const createTodoListChangeMiddleware = callback => store => next => action =>
{
    if (
        action.type === "TODO_LIST_ADD" ||
        action.type === "TODO_LIST_UPDATE" ||
        action.type === "TODO_LIST_REMOVE" ||
        action.type === "TODO_LIST_SET_DONE" ||
        action.type === "TODO_LIST_SET_UNDONE" ||
        action.type === "TODO_LIST_CLEAR_DONE"
    )
    {
        // Middlewares run before reducers take effect, so to invoke the callback AFTER the todo-list has changed, we need to queue up somewhere to the end of
        // the event loop. A 'setImmediate' would be best, but waiting a frame should suffice as well.
        window.requestAnimationFrame(() =>
        {
            callback();
        });
    }

    next(action);
}
