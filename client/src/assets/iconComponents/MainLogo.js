import * as React from "react";

function SvgMainLogo(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 518 518"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#mainLogo_svg__filter0_d)">
        <path
          d="M9 159C9 76.157 76.157 9 159 9h200c82.843 0 150 67.157 150 150v200c0 82.843-67.157 150-150 150H159C76.157 509 9 441.843 9 359V159z"
          fill="#202020"
        />
      </g>
      <g filter="url(#mainLogo_svg__filter1_d)">
        <path
          d="M176.311 146.895C90.311 232.895 81.5 319 91.5 359l.018.072c1.14 4.572 17.174 68.846 84.793 72.823 85 5 192.499-72.5 224.999-162.5S416.5 144 394 119c-23.652-26.28-110.189-79.605-217.689 27.895z"
          stroke="#fff"
          strokeWidth={5}
        />
      </g>
      <path
        d="M306.904 112.3c1.962 4.585-15.134 6.591-32.904 14.2-17.77 7.608-33.037 22.084-35 17.5-1.963-4.584 14.405-18.615 32.175-26.224 17.769-7.608 33.766-10.06 35.729-5.476z"
        fill="url(#mainLogo_svg__paint0_linear)"
      />
      <g filter="url(#mainLogo_svg__filter2_i)">
        <path
          d="M114 381.5c7.5-2.5 92.5-45 157.5-122.5 61.721-73.59 80-140 80-147.5"
          stroke="#C7A381"
          strokeWidth={22.5}
        />
      </g>
      <defs>
        <filter
          id="mainLogo_svg__filter0_d"
          x={0}
          y={0}
          width={518}
          height={518}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={4.5} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.28 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="mainLogo_svg__filter1_d"
          x={81.723}
          y={79.846}
          width={344.036}
          height={362.779}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="mainLogo_svg__filter2_i"
          x={110.433}
          y={111.361}
          width={252.317}
          height={286.811}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={10} />
          <feGaussianBlur stdDeviation={3} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.49 0" />
          <feBlend in2="shape" result="effect1_innerShadow" />
        </filter>
        <linearGradient
          id="mainLogo_svg__paint0_linear"
          x1={279}
          y1={119}
          x2={249}
          y2={54}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default SvgMainLogo;
