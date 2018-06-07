import { mapConcatImmutable, mapSetImmutable, mapDeleteImmutable } from "../utils/map-immutable";
import { todoMainInitialState } from "./todo-main-state";

/**
 * @param {todoMainInitialState} state
 * @param {{ type: string, payload: any }} action
 * @return {StoreState}
 */
export function mainReducer(state, action)
{
    state = state || todoMainInitialState;

    switch (action.type)
    {
        case "MAIN_CHANGE_ACTIVE_VIEW":
            return {
                ...state,
                activeView: action.payload.activeView
            };

        case "MAIN_CHANGE_SORT_MODE":
            return {
                ...state,
                sortMode: action.payload.sortMode
            };
    }

    return state;
}

export function createMainReducer(initialState = todoMainInitialState)
{
    return (state = initialState, action) =>
    {
        switch (action.type)
        {
            case "MAIN_CHANGE_ACTIVE_VIEW":
                return {
                    ...state,
                    activeView: action.payload.activeView
                };

            case "MAIN_CHANGE_SORT_MODE":
                return {
                    ...state,
                    sortMode: action.payload.sortMode
                };
        }

        return state;
    }
}
