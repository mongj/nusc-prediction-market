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
        <div className="flex flex-col items-center justify-start min-h-screen w-full bg-gray-100 p-10 gap-5">
            <Header />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-[1200px]">
                <div className="dashboard-left flex flex-col gap-4 sm:col-start-1 sm:col-end-2">
                    <CoinDisplay coins={coins} />
                    <Progress progress={progress} />
                </div>
                <div className="dashboard-right flex flex-col gap-4 sm:col-start-2 sm:col-end-4">
                    <Surveys />
                    <Prediction />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;