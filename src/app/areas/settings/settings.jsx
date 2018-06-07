import * as React from "react";
import { SettingsSortMode } from "./settings-sort-mode.jsx";

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

export class Settings extends React.Component
{
    render()
    {
        return (
            <div style={WRAPPER_STYLE}>
                <div style={STYLE}>
                    <h1>
                        Settings
                    </h1>

                    <SettingsSortMode />
                </div>
            </div>
        );
    }
}
