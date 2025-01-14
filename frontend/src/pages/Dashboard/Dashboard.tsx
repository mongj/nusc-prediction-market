// nusc-prediction-market/frontend/src/pages/Dashboard/Dashboard.tsx
// nusc-prediction-market/frontend/src/pages/Dashboard/Dashboard.tsx
import './Dashboard.css';
import Button from '../../components/Button/Button';
import SignOutButton from '../../components/SignOutButton/SignOutButton';
import HelpButton2 from '../../components/HelpButton2/HelpButton2';

const Header = () => (
    <div className="flex w-full justify-between items-center">
        <h1 className="text-4xl font-bold">NUSC Prediction Market Study</h1>
        <div className='flex-row flex space-x-4'>
            <HelpButton2 text="Help" onClick={() => alert('Help button clicked!')} />
            <SignOutButton text="Sign Out" onClick={() => alert('Sign Out button clicked!')} />
        </div>
    </div>
);

const CoinDisplay = ({ coins }) => (
    <div className="card coin-display">
        <div className="coin-info">
            <div className="coin-amount">{coins}</div>
            <div className="coin-label">Total coins</div>
        </div>
        <a href="#" className="coin-link">What is this?</a>
    </div>
);

const Progress = ({ progress }) => (
    <div className="card progress-display">
        <h2>My Progress</h2>
        <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(progress.questionsAnswered / 30) * 100}%` }}></div>
        </div>
        <p>{progress.questionsAnswered}/30 questions answered</p>
        {progress.milestones.map((milestone, index) => (
            <div key={index} className="milestone">
                <h3>Milestone {index + 1}</h3>
                <div className="milestone-circles">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={`milestone-circle ${i < milestone.answered ? 'completed' : ''}`}
                        >{i + 1}</div>
                    ))}
                </div>
                <p className="milestone-status">Answer 6 more questions to get the bonus for this milestone</p>
            </div>
        ))}
    </div>
);

const Surveys = () => (
    <div className="card surveys-display">
        <h2>Surveys</h2>
        <div className="survey-item">
            <p>Pre-Survey</p>
            <Button text="Start" onClick={() => alert('Pre-Survey started!')} />
        </div>
        <div className="survey-item">
            <p>Post-Survey</p>
            <Button text="Start" onClick={() => alert('Post-Survey started!')} />
        </div>
    </div>
);

const Prediction = () => (
    <div className="card prediction-display">
        <h2>Make Your Prediction</h2>
        <div className="prediction-item">
            <p>1 Jan</p>
            <p>Pollutant Concentration</p>
            <Button text="Enter" onClick={() => alert('Prediction entered!')} />
        </div>
    </div>
);

const DashboardPage = () => {
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
                    <Surveys />
                    <Prediction />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;