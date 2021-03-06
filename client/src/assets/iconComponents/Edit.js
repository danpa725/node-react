import * as React from "react";

function SvgEdit(props) {
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.969 13.916l9.69-9.5a3.24 3.24 0 014.516 0l1.294 1.27a3.087 3.087 0 010 4.426l-9.728 9.537a2.996 2.996 0 01-2.098.85H3.659A.652.652 0 013 19.84l.1-3.941c.02-.745.331-1.455.869-1.982zm14.57-7.318L17.243 5.33a1.903 1.903 0 00-2.653 0l-.753.737 3.948 3.87.752-.738a1.814 1.814 0 000-2.6zM4.9 14.828l8.007-7.848 3.948 3.869-8.046 7.887-.107.096c-.295.242-.67.377-1.06.377H4.334l.084-3.278c.011-.414.184-.81.483-1.102zM21 19.856a.652.652 0 00-.659-.646h-6.87l-.09.006a.65.65 0 00-.569.64c0 .356.295.645.659.645h6.87l.09-.006a.65.65 0 00.569-.64z"
                fill="currentColor"
            />
        </svg>
    );
}

export default SvgEdit;
