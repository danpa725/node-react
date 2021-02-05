import * as React from "react";

function SvgArrowDown(props) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M4.241 7.746a.811.811 0 011.072-.081l.092.08L12 14.474l6.595-6.727a.811.811 0 011.072-.081l.092.08a.852.852 0 01.08 1.094l-.08.094-7.177 7.321a.811.811 0 01-1.072.081l-.092-.08-7.177-7.322a.852.852 0 010-1.187z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgArrowDown;
