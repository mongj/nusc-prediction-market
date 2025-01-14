import React from 'react';

interface SignOutButtonProps {
    text: string;
    onClick?: () => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({ text, onClick }) => (
    <div
        className="relative h-full cursor-pointer hover:brightness-90"
        onClick={onClick}
    >
        <div className="top-0 left-0 w-[150px] h-[44px] bg-red-800 rounded-[16px] transition-transform duration-200"></div>
        <div className="absolute top-0 left-0 w-[150px] h-[40px] bg-red-500 rounded-[16px] transition-transform duration-200"></div>
        <div className="absolute top-[10px] left-0 w-[150px] text-center text-white text-lg font-semibold leading-6">
            {text}
        </div>
    </div>
);

export default SignOutButton;
