import React from 'react'

interface GreyedButtonProps {
    text: string;
}

const GreyedButton: React.FC<GreyedButtonProps> = ({ text }) => (
<div className="relative h-full">
        <div className="top-0 left-0 w-[150px] h-[44px] bg-gray-200 rounded-[16px]"></div>
        <div className="absolute top-0 left-0 w-[150px] h-[40px] bg-gray-200 rounded-[16px]"></div>
        <div className="absolute top-[10px] left-0 w-[150px] text-center text-gray-500 text-lg font-semibold leading-6">
            {text}
        </div>
    </div>
);

export default GreyedButton;