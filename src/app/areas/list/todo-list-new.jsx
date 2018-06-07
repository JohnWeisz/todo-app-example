import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { FormControl, InputLabel, Input, Button, TextField } from "@material-ui/core";
import { THEME_COLOR } from "../../constants";
import { bind } from "../../../utils/bind";
import { timestampToDateString } from "../../../utils/timestamp-to-date-string";
import { TodoListNewToolbar } from "./todo-list-new-toolbar.jsx";

/** @type {React.CSSProperties} */
const STYLE = {
    paddingTop: 24
};

/** @type {React.CSSProperties} */
const TITLE_WRAPPER_STYLE = {
    width: "100%",
    transition: "width 0.3s ease",
    display: "inline-block",
    verticalAlign: "bottom"
};

/** @type {React.CSSProperties} */
const TITLE_WRAPPER_STYLE_OPEN = {
    ...TITLE_WRAPPER_STYLE,
    width: "calc(100% - 162px)"
};

/** @type {React.CSSProperties} */
const DATE_WRAPPER_STYLE = {
    width: 0,
    transition: "width 0.3s ease, margin-left 0.3s ease",
    overflow: "hidden",
    display: "inline-block",
    opacity: 0,
    verticalAlign: "bottom",
    marginLeft: 0
};

/** @type {React.CSSProperties} */
const DATE_WRAPPER_STYLE_OPEN = {
    ...DATE_WRAPPER_STYLE,
    width: 159,
    opacity: 1,
    marginLeft: 1
};

/** @type {React.CSSProperties} */
const FORM_CONTROL_STYLE = {
    width: "100%"
};

/** @type {React.CSSProperties} */
const SEPARATOR_STYLE = {
    width: 100,
    height: 6,
    backgroundColor: THEME_COLOR,
    margin: "72px auto 24px auto"
};

/**
 * @param {{ todoList: { newItemTemp: TodoItem } }} state
 */
function mapStateToProps(state)
{
    return {
        title: state.todoList.newItemTemp.title,
        deadline: state.todoList.newItemTemp.deadline,
        highPriority: state.todoList.newItemTemp.isHighPriority
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        onCreate: (title, deadline, isHighPriority) => dispatch({
            type: "TODO_LIST_ADD",

            /** @type {TodoItem} */
            payload: {
                title: title,
                deadline: deadline || -1,
                isDone: false,
                description: "",
                isHighPriority: isHighPriority
            }
        }),
        onTempChange: (title, deadline, isHighPriority) => dispatch({
            type: "TODO_LIST_NEW_CHANGE",

            /** @type {TodoItem} */
            payload: {
                title: title,
                deadline: deadline,
                isHighPriority: isHighPriority
            }
        })
    };
}

/**
 * @typedef {{ onCreate: Function, onTempChange: Function, title: string, deadline: string, highPriority: boolean }} TodoListNewProps
 * @typedef {Object} TodoListNewState
 */
@connect(mapStateToProps, mapDispatchToProps)
export class TodoListNew extends React.Component
{
    /**
     * @param {TodoListNewProps} props
     */
    constructor(props, context)
    {
        super(props, context);

        /** @type {TodoListNewState} */
        this.state = {};
    }

    render()
    {
        return (
            <div style={STYLE} ref={elem => this._container = elem}>
                <div style={this.props.title ? TITLE_WRAPPER_STYLE_OPEN : TITLE_WRAPPER_STYLE}>
                    <FormControl style={FORM_CONTROL_STYLE}>
                        <InputLabel>
                            What's on your mind?
                        </InputLabel>

                        <Input
                            value={this.props.title}
                            onChange={this._handleTitleChange}
                            onKeyDown={this._handleKeyDown}
                            fullWidth
                        />
                    </FormControl>
                </div>

                <div style={this.props.title ? DATE_WRAPPER_STYLE_OPEN : DATE_WRAPPER_STYLE}>
                    <TextField
                        label="Due date"
                        type="datetime-local"
                        value={timestampToDateString(this.props.deadline)}
                        onChange={this._handleDateChange}
                        onKeyDown={this._handleKeyDown}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </div>

                <TodoListNewToolbar
                    hidden={!this.props.title}
                    highPriority={this.props.highPriority}
                    onAddClick={this._handleAddButtonClick}
                    onHighPriorityCheck={this._handleHighPriorityCheck}
                />

                <div style={SEPARATOR_STYLE} />
            </div>
        );
    }

    @bind
    _handleTitleChange(e)
    {
        if (this.props.onTempChange)
        {
            this.props.onTempChange(e.target.value, this.props.deadline, this.props.highPriority);
        }
    }

    @bind
    _handleDateChange(e)
    {
        if (this.props.onTempChange)
        {
            this.props.onTempChange(this.props.title, new Date(e.target.value).getTime(), this.props.highPriority);
        }
    }

    @bind
    _handleKeyDown(e)
    {
        if (e.key === "Enter" && this.props.title && this.props.onCreate)
        {
            this.props.onCreate(this.props.title, new Date(this.props.deadline).getTime() || -1, this.props.highPriority);
            this._blurInputs();
        }
    }

    @bind
    _handleHighPriorityCheck(isChecked)
    {
        if (this.props.onTempChange)
        {
            this.props.onTempChange(this.props.title, this.props.deadline, isChecked);
        }
    }

    @bind
    _handleAddButtonClick()
    {
        if (this.props.title && this.props.onCreate)
        {
            this.props.onCreate(this.props.title, new Date(this.props.deadline).getTime() || -1, this.props.highPriority);
            this._blurInputs();
        }
    }

    _blurInputs()
    {
        if (this._container)
        {
            let inputs = this._container.getElementsByTagName("input");

            for (let inputElem of inputs)
            {
                inputElem.blur();
            }
        }
    }
}
