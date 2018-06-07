import * as React from "react";
import { connect } from "react-redux";
import { MENU_COL_WIDTH } from "../../constants";
import { TodoListItem } from "./todo-list-item.jsx";
import { TodoListNew } from "./todo-list-new.jsx";
import { TodoListBottomBar } from "./todo-list-bottom-bar.jsx";

/** @type {React.CSSProperties} */
const WRAPPER_STYLE = {
    boxSizing: "border-box",
    height: "100%",
    overflowY: "scroll"
};

/** @type {React.CSSProperties} */
const STYLE = {
    padding: 24,
    maxWidth: 600,
    margin: "0px auto"
};

/**
 * @typedef {{ items: TodoItem[], sortMode: "deadline-first" | "high-priority-first" }} TodoListProps
 * @typedef {Object} TodoListState
 */

/**
 * @param state
 * @param {TodoListProps} ownProps
 */
function mapStateToProps(state, ownProps)
{
    /** @type {TodoItem[]} */
    let items;

    if (state.todoList.items)
    {
        if (state.main.sortMode === "deadline-first")
        {
            items = Array.from(state.todoList.items.values()).sort((itemA, itemB) => itemA.deadline - itemB.deadline);
        }
        else // if (state.main.sortMode === "high-priority-first")
        {
            items = Array.from(state.todoList.items.values()).sort((itemA, itemB) =>
            {
                if (itemA.isHighPriority && !itemB.isHighPriority)
                {
                    // .sort
                    return -1;
                }
                else if (!itemA.isHighPriority && itemB.isHighPriority)
                {
                    // .sort
                    return 1;
                }
                else
                {
                    // .sort
                    return itemA.deadline - itemB.deadline;
                }
            });
        }
    }
    else
    {
        items = [];
    }

    return {
        items: items
    };
}

@connect(mapStateToProps)
export class TodoList extends React.Component
{
    /**
     * @param {TodoListProps} props
     */
    constructor(props, context)
    {
        super(props, context);

        /** @type {TodoListState} */
        this.state = {};
    }

    render()
    {
        return (
            <div style={WRAPPER_STYLE}>
                <div style={STYLE}>
                    <TodoListNew />

                    <div>
                        {this._renderItems()}
                    </div>

                    <TodoListBottomBar items={this.props.items} />
                </div>
            </div>
        );
    }

    _renderItems()
    {
        return this.props.items.map(item =>
        {
            // .map
            return (
                <TodoListItem key={item.id} id={item.id} />
            );
        });
    }
}
