import { useNavigate } from 'react-router-dom';
import PendingBox from '../../components/StatusBoxes/PendingBox';
import Button from '../../components/Buttons/Button/Button';
import climateQns from '../../storage/ClimateQuestionBank.json';

const Prediction = () => {
    const navigate = useNavigate();
    const handleEnterClick = (id) => {
        navigate(`/predict/${id}`);
    };

    return (
        <div className='flex flex-col text-lg space-y-1'>
            <h2 className='font-bold text-left'>Make Your Prediction</h2>
            <div className="bg-white border-2 border-gray-300 shadow-sm flex flex-col justify-between rounded-2xl overflow-auto">
                {climateQns.map((question) => (
                    <div className="border-gray-300 py-2 px-4 flex justify-between items-center" key={question.id}>
                        <div className="flex flex-row justify-between w-full pr-16">
                            <p className='font-medium text-base'>1 Jan</p>
                            <p className='font-medium text-base'>{question.title}</p>
                            <PendingBox />
                        </div>
                        <Button text="Enter" onClick={() => handleEnterClick(question.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Prediction;