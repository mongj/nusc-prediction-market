import { useNavigate } from 'react-router-dom';
import './ContactUs.css';
import Header from '../../components/Header/Header';
import CoinDisplay from '../../components/CoinDisplay/CoinDisplay';
import Progress from '../../components/Progress/Progress';
import BackButton from '../../components/Buttons/BackButton/BackButton';

const ContactDetails = () => (
    <div className='flex flex-col text-lg space-y-1'>
        <h2 className='font-bold text-left'>Contact Us</h2>
        <div className="bg-white border-2 border-gray-300 shadow-sm flex flex-col justify-between rounded-2xl p-6">
            <p className='text-base font-bold'>Telegram: @predictionmarkets</p>
            <p className='text-base font-bold'>Email: jonus.ho@u.nus.edu</p>
            <p className='text-base font-bold'>Principal Investigator: Dr Michelle Lee</p>
            <p className={'text-base'}>This is a research project under NUSCollege</p>
        </div>
    </div>
);

const ContactUs = () => {
    const navigate = useNavigate();
    const coins = 200;
    const progress = {
        questionsAnswered: 0,
        milestones: [
            { answered: 0 },
            { answered: 0 },
            { answered: 0 },
            { answered: 0 },
            { answered: 0 },
        ],
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen w-full bg-gray-100 p-10 gap-5">
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-[1200px]">
                <div className="dashboard-left flex flex-col gap-4 sm:col-start-1 sm:col-end-2">
                    <CoinDisplay coins={coins} />
                    <Progress progress={progress} />
                </div>
                <div className="dashboard-right flex flex-col gap-4 sm:col-start-2 sm:col-end-4">
                <ContactDetails />
                <BackButton text="Back" onClick={() => navigate('/dashboard')} />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;