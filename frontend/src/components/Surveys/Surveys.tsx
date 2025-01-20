import YetToOpenBox from '../../components/StatusBoxes/YetToOpenBox';
import OpenedBox from "../StatusBoxes/OpenedBox.tsx";
import GreyedButton from '../../components/Buttons/GreyedButton/GreyedButton';
import StartButton from "../Buttons/StartButton/StartButton.tsx";

const Surveys = () => {
    const handleStartClick = () => {
        window.location.href = 'https://nus.au1.qualtrics.com/jfe/preview/previewId/03fabdca-5407-45e0-915d-068f597e4b04/SV_4H0mhef6WQA7GQK?Q_CHL=preview&Q_SurveyVersionID=current';
    };

    return (
        <div className='flex flex-col text-lg space-y-1'>
            <h2 className='font-bold text-left'>Surveys</h2>
            <div className="bg-white border-2 border-gray-300 shadow-sm flex flex-col justify-between rounded-2xl">
                <div className="border-gray-300 border-b-2 py-2 px-4 flex justify-between items-center">
                    <p className='font-medium text-base'>Pre-Survey</p>
                    <OpenedBox />
                    <StartButton text="Start" onClick={handleStartClick} />
                </div>
                <div className="p-2 flex justify-between items-center py-2 px-4">
                    <p className='font-medium text-base'>Post-Survey</p>
                    <YetToOpenBox />
                    <GreyedButton text="Start" />
                </div>
            </div>
        </div>
    );
};

export default Surveys;