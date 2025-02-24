import CoinDisplay from "../../components/CoinDisplay/CoinDisplay";
import Header from "../../components/Header";
import Prediction from "../../components/Prediction/Prediction";
import Progress from "../../components/Progress/Progress";
import Surveys from "../../components/Surveys/Surveys";

const DashboardPage = () => {
  const coins = 200;
  const progress = {
    questionsAnswered: 0,
    milestones: [{ answered: 0 }, { answered: 0 }, { answered: 0 }, { answered: 0 }, { answered: 0 }],
  };

  return (
    <div className="flex h-full w-full flex-col place-items-center justify-start gap-5 bg-gray-100 p-10">
      <div className="max-w-7xl">
        <Header />
        <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-3">
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
    </div>
  );
};

export default DashboardPage;
