import * as React from "react";

function SvgUserDemo(props) {
    return (
        <svg
            width="5em"
            height="5em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M3.121 15.804A13.936 13.936 0 0110 14c2.5 0 4.847.655 6.879 1.804M13 8a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default SvgUserDemo;
