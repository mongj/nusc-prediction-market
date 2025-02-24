interface StartButtonProps {
  text: string;
  onClick?: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ text, onClick }) => (
  <div className="relative h-full cursor-pointer hover:brightness-90" onClick={onClick}>
    <div className="left-0 top-0 h-[44px] w-[150px] rounded-[16px] bg-green-700 transition-transform duration-200"></div>
    <div className="absolute left-0 top-0 h-[40px] w-[150px] rounded-[16px] bg-lime-600 transition-transform duration-200"></div>
    <div className="absolute left-0 top-[8px] flex w-[150px] items-center justify-center gap-3">
      <div className="text-center text-lg font-semibold leading-6 text-white">{text}</div>
    </div>
  </div>
);

export default StartButton;
