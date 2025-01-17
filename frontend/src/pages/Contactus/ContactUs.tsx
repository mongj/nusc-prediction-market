import { useNavigate } from "react-router-dom";
import './ContactUs.css';
import SignOutButton from '../../components/Buttons/SignOutButton/SignOutButton';
import HelpButton2 from '../../components/Buttons/HelpButton2/HelpButton2';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import YetToStartBox from '../../components/StatusBoxes/YetToStartBox';
import BackButton from '../../components/Buttons/BackButton/BackButton'; // Import BackButton
import Button from '../../components/Buttons/Button/Button'; // Import Button

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="flex w-full justify-between items-center">
            <h1 className="text-4xl font-bold">NUSC Prediction Market Study</h1>
            <div className='flex-row flex space-x-4'>
                <HelpButton2 text="Help" onClick={() => alert('Help button clicked!')} />
                <Button text="Contact Us" onClick={() => navigate('/dashboard/contactus')} />
                <SignOutButton text="Sign Out" onClick={() => alert('Sign Out button clicked!')} />
            </div>
        </div>
    );
};

const CoinDisplay = ({ coins }) => (
    <div className="bg-white border-2 border-gray-300 shadow-sm p-4 flex justify-between gap-4 rounded-2xl">
        <div className='flex flex-row space-x-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#D4AF37" class="bi bi-coin" viewBox="0 0 16 16">
                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
            </svg>
            <div className="flex flex-col text-left">
                <div className="font-extrabold">{coins}</div>
                <div className="text-sm text-gray-400">Total coins</div>
            </div>
        </div>
        <a href="#" className="flex text-xs text-gray-500 items-end underline underline-offset-1 hover:text-gray-400">What is this?</a>
    </div>
);

const Progress = ({ progress }) => (
    <div className='flex flex-col text-lg space-y-1'>
        <div className="bg-white border-2 border-gray-300 shadow-sm flex flex-col justify-between rounded-2xl py-4 px-6">
            <h2 className='font-bold text-left'>My Progress</h2>
            <p className='text-sm font-semibold text-left pt-4 pb-2'>{progress.questionsAnswered}/30 questions answered</p>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(progress.questionsAnswered / 30) * 100}%` }}></div>
            </div>
            {progress.milestones.map((milestone, index) => (
                <div key={index} className="flex flex-col items-start py-2">
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <p className='text-md font-medium pr-10'>Milestone {index + 1}</p>
                            <YetToStartBox />
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="flex justify-start space-x-2">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`milestone-circle ${i < milestone.answered ? 'completed' : ''}`}
                                    >{i + 1}</div>
                                ))}
                            </div>
                            <p className="text-sm text-left text-gray-500 pt-1">{(milestone.answered + 1) < 5 ? `Answer ${4 - milestone.answered} more question(s) to get the bonus for this milestone` : 'You have achieved the bonus for this milestone!'}</p>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </div>
    </div>
);

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
        <div className="dashboard-container">
            <Header />
            <div className="dashboard-content">
                <div className="dashboard-left">
                    <CoinDisplay coins={coins} />
                    <Progress progress={progress} />
                </div>
                <div className="dashboard-right">
                    <ContactDetails />
                    <BackButton text="Back" onClick={() => navigate('/dashboard')} /> {/* Add BackButton */}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;