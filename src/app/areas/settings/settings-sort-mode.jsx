import * as React from "react";
import { connect } from "react-redux";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import { bind } from "../../../utils/bind";

/** @type {React.CSSProperties} */
const FORM_CONTROL_STYLE = {
    width: "100%",
    maxWidth: 300
};

function mapStateToProps(state)
{
    return {
        sortMode: state.main.sortMode
    };
}

function mapDispatchToProps(dispatch)
{
    return {
        onSortModeChange: (sortMode) => dispatch({
            type: "MAIN_CHANGE_SORT_MODE",
            payload: {
                sortMode: sortMode
            }
        })
    };
}

/**
 * @typedef {{ sortMode: "deadline-first" | "high-priority-first", onSortModeChange: (sortMode: string) => void }} SettingsSortModeProps
 */
@connect(mapStateToProps, mapDispatchToProps)
export class SettingsSortMode extends React.Component
{
    /**
     * @param {SettingsSortModeProps} props
     */
    constructor(props, context)
    {
        super(props, context);

    }

    render()
    {
        return (
            <div>
                <FormControl style={FORM_CONTROL_STYLE}>
                    <InputLabel>
                        Sort items by
                    </InputLabel>

                    <Select
                        value={this.props.sortMode}
                        onChange={this._handleSortModeChange}
                    >
                        <MenuItem value="deadline-first">
                            Due date
                        </MenuItem>

                        <MenuItem value="high-priority-first">
                            High-priority first
                        </MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }

    @bind
    _handleSortModeChange(e)
    {
        if (this.props.onSortModeChange)
        {
            this.props.onSortModeChange(e.target.value);
        }
    }
}
