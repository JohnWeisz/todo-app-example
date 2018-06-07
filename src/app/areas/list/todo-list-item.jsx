import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { ListItem, Checkbox, ListItemText, ListItemSecondaryAction, IconButton, Popover, FormControlLabel, TextField } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ErrorIcon from "@material-ui/icons/Error";
import { TodoListItemCountdown } from "./todo-list-item-countdown.jsx";
import { TodoListItemEditor } from "./todo-list-item-editor.jsx";
import { bind } from "../../../utils/bind";

const ICON_SIZE = 48;

/** @type {React.CSSProperties} */
const STYLE = {
    margin: 0,
    padding: `48px 24px 48px ${64 + ICON_SIZE}px`,
    position: "relative",
    borderBottom: "1px solid rgba(0,0,0,0.1)"
};

/** @type {React.CSSProperties} */
const HIGH_PRIORITY_ICON_WRAPPER_STYLE = {
    height: 48,
    width: 48,
    padding: 12,
    boxSizing: "border-box",
    display: "inline-block",
    verticalAlign: "bottom",
    opacity: 0.4
};

function mapStateToProps(state, props)
{
    return {
        item: state.todoList.items.get(props.id)
    };
}

function mapDispatchToProps(dispatch, props)
{
    return {
        onDone: (id, isDone) => dispatch({
            type: isDone ? "TODO_LIST_SET_DONE" : "TODO_LIST_SET_UNDONE",
            payload: {
                id: id
            }
        })
    };
}

/**
 * @typedef {{ id: number, item: TodoItem, onDone: Function }} TodoListItemProps
 * @typedef {{ isDetailPopoverOpen: boolean }} TodoListItemState
 */
@connect(mapStateToProps, mapDispatchToProps)
export class TodoListItem extends React.Component
{
    /**
     * @param {TodoListItemProps} props
     */
    constructor(props, context)
    {
        super(props, context);

        /** @type {TodoListItemState} */
        this.state = {
            isDetailPopoverOpen: false
        };
    }

    render()
    {
        /** @type {TodoItem} */
        let todoItem = this.props.item;

        return (
            <ListItem
                ref={listItem => this._listItemRef = listItem}
                button
                dense
                onClick={this._handleClick}
            >
                <Checkbox
                    color="primary"
                    checked={todoItem.isDone}
                    onChange={this._handleDoneToggle}
                    tabIndex={-1}
                />
                <ListItemText
                    primary={todoItem.title}
                    secondary={this._getSecondaryText()}
                />
                <ListItemSecondaryAction>
                    {this._renderHighPriorityIconIfNeeded()}

                    <IconButton
                        onClick={this._handleMoreClick}
                        onMouseDown={this._handleMoreMouseDown}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                </ListItemSecondaryAction>

                <Popover
                    open={this.state.isDetailPopoverOpen}
                    onClose={this._handlePopoverClose}
                    anchorEl={this._popoverAnchor}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    onClick={this._handlePopoverMouseDownAndClick}
                    onMouseDown={this._handlePopoverMouseDownAndClick}
                >
                    <TodoListItemEditor todoItem={todoItem} onClose={this._handlePopoverClose} />
                </Popover>

                <span />
            </ListItem>
        );
    }

    _getSecondaryText()
    {
        /** @type {TodoItem} */
        let todoItem = this.props.item;

        if (todoItem.isDone || todoItem.deadline === -1)
        {
            return undefined;
        }

        return (
            <TodoListItemCountdown deadline={todoItem.deadline} />
        );
    }

    _renderHighPriorityIconIfNeeded()
    {
        if (this.props.item && this.props.item.isHighPriority)
        {
            return (
                <div style={HIGH_PRIORITY_ICON_WRAPPER_STYLE} title="High priority">
                    <ErrorIcon />
                </div>
            );
        }
    }

    componentDidMount()
    {
        ReactDOM.findDOMNode(this._listItemRef).animate(
            [
                { opacity: 0, transform: "translateX(-48px)" },
                { opacity: 1, transform: "translateX(0)" }
            ],
            {
                duration: 400,
                easing: "ease"
            }
        );
    }

    @bind
    _handleDoneToggle(e, isDone)
    {
        if (this.props.onDone)
        {
            // Toggle.
            this.props.onDone(this.props.id, isDone);
        }
    }

    @bind
    _handleClick()
    {
        if (this.props.onDone)
        {
            // Toggle.
            this.props.onDone(this.props.id, !this.props.item.isDone);
        }
    }

    @bind
    _handleMoreMouseDown(e)
    {
        // The touch-ripple event is triggered on mousedown, so we'll block that.
        e.stopPropagation();
    }

    @bind
    _handleMoreClick(e)
    {
        e.stopPropagation();

        this._popoverAnchor = e.target;

        this.setState(state =>
        {
            state.isDetailPopoverOpen = !state.isDetailPopoverOpen;
            return state;
        });
    }

    @bind
    _handlePopoverClose(e)
    {
        this.setState(state =>
        {
            state.isDetailPopoverOpen = false;
            return state;
        });
    }

    @bind
    _handlePopoverMouseDownAndClick(e)
    {
        // The "click-away" layer used by the Popover will trigger mousedown and click events on the Popover component itself, which will bubble up to the
        // ListItem component and cause click/mousedown behavior (toggle/ripple).
        e.stopPropagation();
    }
}
