import { useNavigate } from "react-router-dom";

import BackButton from "../../components/Buttons/BackButton/BackButton";
import CoinDisplay from "../../components/CoinDisplay";
import Header from "../../components/Header";
import Progress from "../../components/Progress";
import "./ContactUs.css";

const ContactDetails = () => (
  <div className="flex flex-col space-y-1 text-lg">
    <h2 className="text-left font-bold">Contact Us</h2>
    <div className="flex flex-col justify-between rounded-2xl border-2 border-gray-300 bg-white p-6 shadow-sm">
      <p className="text-base font-bold">Telegram: @predictionmarkets</p>
      <p className="text-base font-bold">Email: jonus.ho@u.nus.edu</p>
      <p className="text-base font-bold">Principal Investigator: Dr Michelle Lee</p>
      <p className={"text-base"}>This is a research project under NUSCollege</p>
    </div>
  </div>
);

const ContactUs = () => {
  const navigate = useNavigate();
  const coins = 200;
  const progress = {
    questionsAnswered: 0,
    milestones: [{ answered: 0 }, { answered: 0 }, { answered: 0 }, { answered: 0 }, { answered: 0 }],
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-5 bg-gray-100 p-10">
      <Header />
      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="dashboard-left flex flex-col gap-4 sm:col-start-1 sm:col-end-2">
          <CoinDisplay coins={coins} />
          <Progress progress={progress} />
        </div>
        <div className="dashboard-right flex flex-col gap-4 sm:col-start-2 sm:col-end-4">
          <ContactDetails />
          <BackButton text="Back" onClick={() => navigate("/dashboard")} />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
