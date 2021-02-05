import * as React from "react";

function SvgUserCircle(props) {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 10a8 8 0 11-16.001 0A8 8 0 0118 10zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.987 5.987 0 004.546-2.084A5 5 0 0010 11z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgUserCircle;
