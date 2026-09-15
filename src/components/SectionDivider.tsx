import React from "react";

interface SectionDividerProps {
  className?: string;
  lineColor?: string;
  iconColor?: string;
}

export default function SectionDivider({
  className = "mt-12 sm:mt-16",
  lineColor = "bg-[#d5cbbe]",
  iconColor = "text-[#998971]",
}: SectionDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-5 ${className}`}>
      <span className={`w-20 sm:w-28 md:w-36 h-[1px] ${lineColor}`} />
      <div className={`w-8 h-8 flex items-center justify-center ${iconColor}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6"
        >
          <path
            d="M12 3C6.5 3 2 7.5 2 13C2 13.55 2.45 14 3 14H21C21.55 14 22 13.55 22 13C22 7.5 17.5 3 12 3Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 14V20C10 20.55 10.45 21 11 21H13C13.55 21 14 20.55 14 20V14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 9C9 9 10 11 12 11C14 11 15 9 15 9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={`w-20 sm:w-28 md:w-36 h-[1px] ${lineColor}`} />
    </div>
  );
}
