import * as React from "react";
import { connect } from "react-redux";
import { List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import { THEME_COLOR } from "./constants";
import { bind } from "../utils/bind";
import { MenuCurrentTime  } from "./menu/menu-current-time.jsx";

/** @type {React.CSSProperties} */
const TODO_MENU_STYLE = {
    backgroundColor: THEME_COLOR,
    minHeight: "100%",
    color: "#fff"
};

/** @type {React.CSSProperties} */
const TEXT_STYLE = {
    color: "#fff"
};

/** @type {React.CSSProperties} */
const ICON_STYLE = {
    color: "#fff"
};

function mapDispatchToProps(dispatch)
{
    return {
        onViewChange: (activeView) => dispatch({
            type: "MAIN_CHANGE_ACTIVE_VIEW",
            payload: {
                activeView: activeView
            }
        })
    };
}

@connect(undefined, mapDispatchToProps, undefined, { pure: true })
export class TodoMenu extends React.Component
{
    render()
    {
        return (
            <div style={TODO_MENU_STYLE}>
                <MenuCurrentTime />

                <List>
                    <ListItem button onClick={this._handleTasksClick}>
                        <ListItemIcon>
                            <AssignmentIcon style={ICON_STYLE} />
                        </ListItemIcon>

                        <ListItemText primary={<span style={TEXT_STYLE}>Tasks</span>} />
                    </ListItem>

                    {/* <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon style={ICON_STYLE} />
                        </ListItemIcon>

                        <ListItemText primary={<span style={TEXT_STYLE}>Account</span>} />
                    </ListItem> */}

                    <ListItem button onClick={this._handleSettingsClick}>
                        <ListItemIcon>
                            <SettingsIcon style={ICON_STYLE} />
                        </ListItemIcon>

                        <ListItemText primary={<span style={TEXT_STYLE}>Settings</span>} />
                    </ListItem>
                </List>
            </div>
        );
    }

    @bind
    _handleTasksClick()
    {
        if (this.props.onViewChange)
        {
            this.props.onViewChange("list");
        }
    }

    @bind
    _handleSettingsClick()
    {
        if (this.props.onViewChange)
        {
            this.props.onViewChange("settings");
        }
    }
}
