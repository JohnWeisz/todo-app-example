import * as React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

/** @type {React.CSSProperties} */
const STYLE = {
    fontSize: "13px",
    color: "rgba(0,0,0,0.8)",
    paddingTop: 12,
    marginTop: 24,
    borderTop: "1px solid rgba(0,0,0,0.1)"
};

/** @type {React.CSSProperties} */
const TEXT_STYLE = {
    lineHeight: "36px", // Same as MaterialUI Button height.
    verticalAlign: "middle",
    display: "inline-block"
};

/** @type {React.CSSProperties} */
const BUTTON_STYLE = {
    marginLeft: 12,
    float: "right"
};

function mapDispatchToProps(dispatch)
{
    return {
        onRequestClearDone: () => dispatch({
            type: "TODO_LIST_CLEAR_DONE"
        })
    };
}

/**
 * @typedef {{ items: TodoItem[], onRequestClearDone: () => void }} TodoListBottomBarProps
 */
@connect(undefined, mapDispatchToProps)
export class TodoListBottomBar extends React.Component
{
    /**
     * @param {TodoListBottomBarProps} props
     */
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        let numberOfDoneItems = this._getNumberOfDoneItems(this.props.items);

        if (numberOfDoneItems === 0)
        {
            return null;
        }

        return (
            <div style={STYLE} ref={div => this._container = div}>
                <span style={TEXT_STYLE}>
                    {this._getNumberOfDoneItemsDisplayString(numberOfDoneItems)} done.
                </span>

                <Button variant="outlined" color="primary" style={BUTTON_STYLE} onClick={this.props.onRequestClearDone}>
                    Clear done
                </Button>
            </div>
        );
    }

    componentDidMount()
    {
        this._runAppearAnimationIfRendered();
    }

    /**
     * @param {TodoListBottomBarProps} prevProps
     */
    componentDidUpdate(prevProps, prevState)
    {
        let previousCount = this._getNumberOfDoneItems(prevProps.items);
        let currentCount = this._getNumberOfDoneItems(this.props.items);

        if (previousCount === 0 && currentCount === 1)
        {
            this._runAppearAnimationIfRendered();
        }
    }

    _runAppearAnimationIfRendered()
    {
        if (!this._container) return;

        this._container.animate(
            [
                { opacity: 0, transform: "translateY(-24px)" },
                { opacity: 1, transform: "translateY(0px)" }
            ],
            {
                duration: 300,
                easing: "ease"
            }
        );
    }

    /**
     * @param {number} numberOfDoneItems
     */
    _getNumberOfDoneItemsDisplayString(numberOfDoneItems)
    {
        if (numberOfDoneItems === 1)
        {
            return "1 item";
        }
        else
        {
            return `${numberOfDoneItems} items`
        }
    }

    /**
     * @param {TodoItem[]} items
     */
    _getNumberOfDoneItems(items)
    {
        let count = 0;

        for (let item of items)
        {
            if (item.isDone)
            {
                count++;
            }
        }

        return count;
    }
}
