import YetToOpenBox from '../../components/StatusBoxes/YetToOpenBox';
import GreyedButton from '../../components/Buttons/GreyedButton/GreyedButton';

const Surveys = () => (
    <div className='flex flex-col text-lg space-y-1'>
        <h2 className='font-bold text-left'>Surveys</h2>
        <div className="bg-white border-2 border-gray-300 shadow-sm flex flex-col justify-between rounded-2xl">
            <div className="border-gray-300 border-b-2 py-2 px-4 flex justify-between items-center">
                <p className='font-medium text-base'>Pre-Survey</p>
                <YetToOpenBox />
                <GreyedButton text="Start" />
            </div>
            <div className="p-2 flex justify-between items-center py-2 px-4">
                <p className='font-medium text-base'>Post-Survey</p>
                <YetToOpenBox />
                <GreyedButton text="Start" />
            </div>
        </div>
    </div>
);

export default Surveys;