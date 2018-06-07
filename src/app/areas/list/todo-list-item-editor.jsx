import * as React from "react";
import { connect } from "react-redux";
import { TextField, FormControlLabel, Checkbox, Button, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { bind } from "../../../utils/bind";
import { timestampToDateString } from "../../../utils/timestamp-to-date-string";

/** @type {React.CSSProperties} */
const STYLE = {
    padding: "24px 24px 12px 24px",
    maxWidth: 500
};

/** @type {React.CSSProperties} */
const CHECKBOX_STYLE = {
    verticalAlign: "top"
};

/** @type {React.CSSProperties} */
const BUTTON_STYLE = {
    margin: 0
};

/** @type {React.CSSProperties} */
const TEXT_FIELD_STYLE = {
    marginBottom: 24
};

/** @type {React.CSSProperties} */
const BUTTONS_WRAPPER_STYLE = {
    float: "right"
};

/**
 * @typedef {{ todoItem: TodoItem, onChange: (todoItem: TodoItem) => void, onDelete: (id: number) => void, onClose: () => void }} TodoListItemEditorProps
 */

/**
 * @param {Function} dispatch
 * @param {TodoListItemEditorProps} props
 */
function mapDispatchToProps(dispatch, props)
{
    return {
        /**
         * @param {TodoItem} todoItem
         */
        onChange: (todoItem) => dispatch({
            type: "TODO_LIST_UPDATE",
            payload: todoItem
        }),

        /**
         * @param {number} id
         */
        onDelete: (id) => dispatch({
            type: "TODO_LIST_REMOVE",
            payload: {
                id: id
            }
        })
    };
}

@connect(undefined, mapDispatchToProps)
export class TodoListItemEditor extends React.Component
{
    /**
     * @param {TodoListItemEditorProps} props
     */
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        /** @type {TodoItem} */
        let todoItem = this.props.todoItem;

        return (
            <div style={STYLE}>
                <TextField
                    style={TEXT_FIELD_STYLE}
                    label="Title"
                    value={todoItem.title}
                    onChange={this._handleTitleChange}
                    fullWidth
                />

                <TextField
                    style={TEXT_FIELD_STYLE}
                    fullWidth
                    label="Due date"
                    type="datetime-local"
                    value={timestampToDateString(todoItem.deadline)}
                    onChange={this._handleDeadlineChange}
                    onKeyDown={this._handleKeyDown}
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                <FormControlLabel
                    control={
                        <Checkbox color="primary" checked={todoItem.isHighPriority} onChange={this._handlePriorityCheck} />
                    }
                    label="High priority"
                />

                <div style={BUTTONS_WRAPPER_STYLE}>
                    <Button variant="raised" color="primary" style={BUTTON_STYLE} onClick={this.props.onClose}>
                        Ok
                    </Button>

                    <IconButton onClick={this._handleDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        );
    }

    @bind
    _handleTitleChange(e)
    {
        if (this.props.onChange)
        {
            this.props.onChange({
                ...this.props.todoItem,
                title: e.target.value
            });
        }
    }

    @bind
    _handleDeadlineChange(e)
    {
        if (this.props.onChange)
        {
            let newDeadline = new Date(e.target.value).getTime();

            if (isNaN(newDeadline) || newDeadline <= Date.now())
            {
                newDeadline = -1;
            }

            this.props.onChange({
                ...this.props.todoItem,
                deadline: newDeadline
            });
        }
    }

    @bind
    _handlePriorityCheck(e, isChecked)
    {
        if (this.props.onChange)
        {
            this.props.onChange({
                ...this.props.todoItem,
                isHighPriority: isChecked
            });
        }
    }

    @bind
    _handleDeleteClick(e)
    {
        if (this.props.onDelete)
        {
            this.props.onDelete(this.props.todoItem.id);
        }
    }
}
