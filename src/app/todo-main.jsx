import * as React from "react";
import { connect } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { THEME_COLOR, MENU_COL_WIDTH } from "./constants";
import { store } from "./store";
import { TodoMenu } from "./todo-menu.jsx";
import { TodoList } from "./areas/list/todo-list.jsx";
import { Settings } from "./areas/settings/settings.jsx";

/** @type {React.CSSProperties} */
const LEFT_COL_STYLE = {
    float: "left",
    width: MENU_COL_WIDTH,
    maxWidth: "100%"
};

/** @type {React.CSSProperties} */
const RIGHT_COL_STYLE = {
    float: "right",
    width: `calc(100% - ${MENU_COL_WIDTH}px)`
};

// const THEME = createMuiTheme({
//     palette: {
//         primary: THEME_COLOR
//     }
// });

function mapStateToProps(state)
{
    return {
        activeView: state.main.activeView
    };
}

@connect(mapStateToProps)
export class TodoMain extends React.Component
{
    render()
    {
        return (
            <MuiThemeProvider theme={createMuiTheme()}>
                <div style={LEFT_COL_STYLE}>
                    <TodoMenu />
                </div>

                <div style={RIGHT_COL_STYLE}>
                    {this._renderActiveView()}
                </div>
            </MuiThemeProvider>
        );
    }

    _renderActiveView()
    {
        switch (this.props.activeView)
        {
            case "list":
                return (<TodoList />);

            case "settings":
                return (<Settings />);
        }
    }
}
