import React from "react";

interface GreyedButtonProps {
  text: string;
}

const GreyedButton: React.FC<GreyedButtonProps> = ({ text }) => (
  <div className="relative h-full">
    <div className="left-0 top-0 h-[44px] w-[150px] rounded-[16px] bg-gray-200"></div>
    <div className="absolute left-0 top-0 h-[40px] w-[150px] rounded-[16px] bg-gray-200"></div>
    <div className="absolute left-0 top-[10px] w-[150px] text-center text-lg font-semibold leading-6 text-gray-500">
      {text}
    </div>
  </div>
);

export default GreyedButton;
