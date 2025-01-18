import Header from '../../components/Header/Header';
import CoinDisplay from '../../components/CoinDisplay/CoinDisplay';
import Progress from '../../components/Progress/Progress';
import Surveys from '../../components/Surveys/Surveys';
import Prediction from '../../components/Prediction/Prediction';
import './Dashboard.css';

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