import * as React from "react";

/** @type {React.CSSProperties} */
const STYLE = {
    textAlign: "center",
    padding: "48px 24px"
};

/** @type {React.CSSProperties} */
const TIME_STYLE = {
    fontWeight: 100,
    fontSize: "48px"
};

/** @type {React.CSSProperties} */
const DAY_NAME_STYLE = {
    opacity: 0.5,
    fontSize: "13px",
    padding: "6px 0"
};

/** @type {React.CSSProperties} */
const DATE_STYLE = {
    opacity: 0.5,
    fontSize: "13px",
    padding: "6px 0"
};

const DAY_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * @typedef {Object} MenuCurrentTimeProps
 * @typedef {Object} MenuCurrentTimeState
 */
export class MenuCurrentTime extends React.Component
{
    /**
     * @param {MenuCurrentTimeProps} props
     */
    constructor(props, context)
    {
        super(props, context);

        /** @type {MenuCurrentTimeState} */
        this.state = {};
    }

    render()
    {
        let currentDate = new Date();

        return (
            <div style={STYLE}>
                <div style={TIME_STYLE}>
                    {currentDate.getHours().toString().padStart(2, "0")} : {currentDate.getMinutes().toString().padStart(2, "0")}
                </div>

                <div style={DAY_NAME_STYLE}>
                    {this._dayOfMonthToDayName(currentDate.getDay())}
                </div>

                <div style={DATE_STYLE}>
                    {currentDate.getFullYear()} / {currentDate.getMonth()} / {currentDate.getDate()}
                </div>
            </div>
        );
    }

    componentDidMount()
    {
        this._selfUpdateIntervalHandle = window.setInterval(() => this.forceUpdate(), 1000);
    }

    componentWillUnmount()
    {
        window.clearInterval(this._selfUpdateIntervalHandle);
    }

    /**
     * @param {number} dayOfWeek
     */
    _dayOfMonthToDayName(dayOfWeek)
    {
        return DAY_OF_WEEK[dayOfWeek];
    }
}
