import { useEffect, useState } from "react";

import CoinDisplay from "@/components/CoinDisplay";
import Header from "@/components/Header";
import MarketSection from "@/components/MarketSection";
import Progress from "@/components/Progress";
import SurveySection from "@/components/SurveySection";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col place-items-center justify-start bg-gray-100">
      {/* Header with improved margins and spacing */}
      <div className="w-full bg-white shadow-md mb-3 sm:mb-5">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-5">
          <Header />
        </div>
      </div>

      {/* Main content area with consistent padding */}
      <div className="w-full max-w-7xl px-2 sm:px-6 lg:px-8 pb-4 sm:pb-12">
        {isLoading ? (
          <div className="w-full py-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          </div>
        ) : (
          <section className="grid w-full grid-cols-1 gap-3 sm:gap-6 lg:gap-8 sm:grid-cols-3 mt-0">
            <div className="dashboard-left flex flex-col gap-2 sm:gap-5 order-2 sm:order-1 sm:col-span-1">
              {/* Move heading and subtitle here */}
              <div className="mb-2 sm:mb-2">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 text-xs sm:text-base">View your progress and market predictions</p>
              </div>
              <CoinDisplay />
              <Progress />
            </div>
            <div className="dashboard-right flex flex-col gap-2 sm:gap-5 order-1 sm:order-2 sm:col-span-2">
              <SurveySection />
              <MarketSection />
            </div>
          </section>
        )}
      </div>

      {/* Footer area */}
      <div className="w-full py-3 sm:py-4 bg-white mt-auto border-t border-gray-200">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center text-xs sm:text-sm text-gray-500">
          © 2025 NUSC Prediction Markets Research Project
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;