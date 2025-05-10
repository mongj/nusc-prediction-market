import CoinDisplay from "@/components/CoinDisplay";
import Header from "@/components/Header";
import MarketSection from "@/components/MarketSection";
import Progress from "@/components/Progress";
import SurveySection from "@/components/SurveySection";

const DashboardPage = () => {
  const progress = {
    questionsAnswered: 0,
    milestones: [{ answered: 0 }, { answered: 0 }, { answered: 0 }, { answered: 0 }, { answered: 0 }],
  };

  return (
    <div className="flex min-h-screen w-full flex-col place-items-center justify-start gap-3 sm:gap-5 bg-gray-100 p-4 sm:p-16">
      <div className="w-full max-w-7xl">
        <Header />
        <section className="grid w-full max-w-[1200px] grid-cols-1 gap-4 sm:gap-8 sm:grid-cols-3 mt-4 sm:mt-8">
          <div className="dashboard-left flex flex-col gap-3 sm:gap-4 sm:col-start-1 sm:col-end-2">
            <CoinDisplay />
            <Progress progress={progress} />
          </div>
          <div className="dashboard-right flex flex-col gap-3 sm:gap-4 sm:col-start-2 sm:col-end-4">
            <SurveySection />
            <MarketSection />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;