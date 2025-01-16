import React from 'react';

interface YesButtonProps {
    onClick?: () => void;
}

const YesButton: React.FC<YesButtonProps> = ({ onClick }) => (
    <div
        className="relative h-full cursor-pointer hover:brightness-90"
        onClick={onClick}
    >
        <div className="top-0 left-0 w-[150px] h-[44px] bg-green-700 rounded-[16px] transition-transform duration-200"></div>
        <div className="absolute top-0 left-0 w-[150px] h-[40px] bg-lime-600 rounded-[16px] transition-transform duration-200"></div>
        <div className="absolute top-[8px] left-0 w-[150px] flex justify-center items-center gap-3">
            <div className="text-white text-lg font-semibold leading-6 text-center">
                Yes
            </div>
        </div>
    </div>
);

export default YesButton;
