export const createSortModeChangeMiddleware = callback => store => next => action =>
{
    if (action.type === "MAIN_CHANGE_SORT_MODE")
    {
        // Middlewares run before reducers take effect, so to invoke the callback AFTER the state has changed, we need to queue up somewhere to the end of
        // the event loop. A 'setImmediate' would be best, but waiting a frame should suffice as well.
        window.requestAnimationFrame(() =>
        {
            callback();
        });
    }

    next(action);
}
