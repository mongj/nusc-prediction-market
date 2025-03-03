import React from "react";

interface NoButtonProps {
  onClick?: () => void;
}

const NoButton: React.FC<NoButtonProps> = ({ onClick }) => (
  <div className="relative h-full cursor-pointer hover:brightness-90" onClick={onClick}>
    <div className="left-0 top-0 h-[44px] w-[150px] rounded-[16px] bg-red-800 transition-transform duration-200"></div>
    <div className="absolute left-0 top-0 h-[40px] w-[150px] rounded-[16px] bg-red-500 transition-transform duration-200"></div>
    <div className="absolute left-0 top-[10px] w-[150px] text-center text-lg font-semibold leading-6 text-white">
      No
    </div>
  </div>
);

export default NoButton;
