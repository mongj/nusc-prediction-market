import React from 'react'

interface BackButtonProps {
    onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <div
        className="relative h-full cursor-pointer hover:brightness-90"
        onClick={onClick}
    >
        <div className="top-0 left-0 w-[150px] h-[44px] bg-gray-200 rounded-[16px] transition-transform duration-200"></div>
        <div className="absolute top-0 left-0 w-[150px] h-[40px] bg-white border-2 border-gray-200 rounded-[16px] transition-transform duration-200"></div>
        <div className="absolute top-[10px] left-0 w-[150px] text-center text-blue-400 text-lg font-semibold leading-6">
            Back
        </div>
    </div>
  )
}

export default BackButton