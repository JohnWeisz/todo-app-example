import * as React from "react";

import { THEME_COLOR } from "../../constants";

const DURATION_1_SECOND = 1000;
const DURATION_1_MINUTE = DURATION_1_SECOND * 60;
const DURATION_1_HOUR = DURATION_1_MINUTE * 60;
const DURATION_1_DAY = DURATION_1_HOUR * 24;

const THRESHOLD_CRITICAL = DURATION_1_MINUTE * 10;
const THRESHOLD_CRITICAL_2 = DURATION_1_SECOND * 30;

/** @type {React.CSSProperties} */
const STYLE = {
    fontSize: "12px",
    color: "rgba(0,0,0,0.5)"
};

/** @type {React.CSSProperties} */
const STYLE_CRITICAL = {
    ...STYLE,
    color: THEME_COLOR,
    fontWeight: 700
};

/** @type {React.CSSProperties} */
const STYLE_EXPIRED = {
    ...STYLE_CRITICAL
};

/**
 * @typedef {{ deadline: number }} TodoListItemCountdownProps
 * @typedef {{ timeRemaining: number }} TodoListItemCountdownState
 */
export class TodoListItemCountdown extends React.Component
{
    /**
     * @param {TodoListItemCountdownProps} props
     */
    constructor(props, context)
    {
        super(props, context);

        /** @type {TodoListItemCountdownState} */
        this.state = {
            timeRemaining: this._getRemainingTime(props.deadline)
        };

        this._selfUpdateIntervalHandle = 0;
    }

    render()
    {
        if (this.state.timeRemaining === 0)
        {
            return (
                <span style={STYLE_EXPIRED} ref={elem => this._container = elem}>
                    Late
                </span>
            );
        }
        else if (this.state.timeRemaining <= THRESHOLD_CRITICAL_2)
        {
            return (
                <span style={STYLE_CRITICAL} ref={elem => this._container = elem}>
                    {this._getTimeRemainingFormatted(this.state.timeRemaining)} left
                </span>
            );
        }
        else if (this.state.timeRemaining <= THRESHOLD_CRITICAL)
        {
            return (
                <span style={STYLE_CRITICAL} ref={elem => this._container = elem}>
                    {this._getTimeRemainingFormatted(this.state.timeRemaining)} left
                </span>
            );
        }
        else
        {
            return (
                <span style={STYLE} ref={elem => this._container = elem}>
                    {this._getTimeRemainingFormatted(this.state.timeRemaining)} left
                </span>
            );
        }
    }

    componentDidMount()
    {
        this._selfUpdateIntervalHandle = window.setInterval(() =>
        {
            this.setState(state =>
            {
                state.timeRemaining = this._getRemainingTime(this.props.deadline);
                return state;
            });
        }, 1000);
    }

    /**
     * @param {TodoListItemCountdownProps} nextProps
     */
    componentWillReceiveProps(nextProps)
    {
        if (this.props.deadline !== nextProps.deadline)
        {
            this.setState(state =>
            {
                state.timeRemaining = this._getRemainingTime(nextProps.deadline);
                return state;
            });
        }
    }

    componentWillUnmount()
    {
        window.clearInterval(this._selfUpdateIntervalHandle);
    }

    _getRemainingTime(deadline)
    {
        return Math.max(0, deadline - Date.now());
    }

    /**
     * @param {number} timeLeft
     * @returns {string}
     */
    _getTimeRemainingFormatted(timeRemaining)
    {
        if (timeRemaining > DURATION_1_DAY * 2)
        {
            // Display remaining days.
            return `${Math.floor(timeRemaining / DURATION_1_DAY)} days`;
        }
        else if (timeRemaining > DURATION_1_HOUR)
        {
            // Display remaining hours.
            if (timeRemaining >= DURATION_1_HOUR * 2)
            {
                return `${Math.floor(timeRemaining / DURATION_1_HOUR)} hours`;
            }
            else
            {
                return `1 hour`;
            }
        }
        else if (timeRemaining > DURATION_1_MINUTE * 5)
        {
            // Display remaining minutes.
            return `${Math.floor(timeRemaining / DURATION_1_MINUTE)} minutes`;
        }
        else if (timeRemaining > DURATION_1_MINUTE)
        {
            // Display remaining minutes+seconds.
            let wholeMinutesRemaining = Math.floor(timeRemaining / DURATION_1_MINUTE);
            let secondsRemaining = Math.floor((timeRemaining % DURATION_1_MINUTE) / DURATION_1_SECOND);

            return `${wholeMinutesRemaining} minutes, ${secondsRemaining} seconds`;
        }
        else if (timeRemaining > 0)
        {
            // Display remaining seconds.
            return `${Math.floor(timeRemaining / DURATION_1_SECOND)} seconds`;
        }
        else
        {
            return `0 seconds`;
        }
    }
}
