import * as React from "react";
import { FormControlLabel, Checkbox, Button } from "@material-ui/core";
import AssignmentLate from '@material-ui/icons/AssignmentLate';
import { bind } from "../../../utils/bind";

/** @type {React.CSSProperties} */
const STYLE = {
    transition: "opacity 0.3s ease",
    marginTop: 6
};

/** @type {React.CSSProperties} */
const STYLE_HIDDEN = {
    ...STYLE,
    opacity: 0,
    pointerEvents: "none"
};

/** @type {React.CSSProperties} */
const BUTTON_STYLE = {
    marginRight: 24
};

/**
 * @typedef {{ hidden: boolean, onAddClick: Function, highPriority: boolean, onHighPriorityCheck: (isChecked: boolean) => void }} TodoListNewToolbarProps
 */
export class TodoListNewToolbar extends React.Component
{
    /**
     * @param {TodoListNewToolbarProps} props
     */
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        return (
            <div style={this.props.hidden ? STYLE_HIDDEN : STYLE}>
                <Button variant="raised" color="primary" style={BUTTON_STYLE} onClick={this._handleAddClick}>
                    Add
                </Button>

                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            checked={this.props.highPriority}
                            onChange={this._handleHighPriorityChange}
                        />
                    }
                    label="High priority"
                />
            </div>
        );
    }

    @bind
    _handleAddClick()
    {
        if (this.props.onAddClick)
        {
            this.props.onAddClick();
        }
    }

    @bind
    _handleHighPriorityChange(e, isChecked)
    {
        if (this.props.onHighPriorityCheck)
        {
            this.props.onHighPriorityCheck(isChecked);
        }
    }
}
