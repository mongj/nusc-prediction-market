import React from "react";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <div className="relative h-full cursor-pointer hover:brightness-90" onClick={onClick}>
      <div className="left-0 top-0 h-[44px] w-[150px] rounded-[16px] bg-gray-200 transition-transform duration-200"></div>
      <div className="absolute left-0 top-0 h-[40px] w-[150px] rounded-[16px] border-2 border-gray-200 bg-white transition-transform duration-200"></div>
      <div className="absolute left-0 top-[10px] w-[150px] text-center text-lg font-semibold leading-6 text-blue-400">
        Back
      </div>
    </div>
  );
};

export default BackButton;
