import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BackButton from "../../components/Buttons/BackButton/BackButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton/ConfirmButton";
import NoButton from "../../components/Buttons/NoButton/NoButton";
import YesButton from "../../components/Buttons/YesButton/YesButton";
import CoinSlider from "../../components/CoinSlider";
import GaugeComponent from "../../components/GaugeComponent";
import climateQns from "../../storage/ClimateQuestionBank.json";

const Question = ({ question }) => {
  const [UserAnswer, setUserAnswer] = useState("");
  const [coins, setCoins] = useState(1);

  return (
    <div className="flex flex-col items-center rounded-2xl border-2 border-gray-300 bg-white p-6 shadow-sm">
      <p className="max-w-2xl pb-2 text-center text-xl font-bold">{question}</p>
      <div className="flex flex-row justify-between space-x-2 pb-4">
        <YesButton onClick={() => setUserAnswer("Yes")} />
        <NoButton onClick={() => setUserAnswer("No")} />
      </div>
      <p className="pb-4 text-center text-base font-semibold">How many coins will you wager on your answer?</p>
      <CoinSlider value={coins} onChange={setCoins} />
      <ConfirmWager UserAnswer={UserAnswer} coins={coins} />
    </div>
  );
};

const ConfirmWager = ({ UserAnswer, coins }) => (
  <div className="flex flex-row justify-between space-x-6 rounded-2xl border-2 border-blue-500 bg-blue-50 p-4 shadow-sm">
    <div className="flex flex-col">
      <p className="text-sm">
        You answered: <strong>{UserAnswer}</strong>
      </p>
      <span className="flex flex-row space-x-1 pt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#D4AF37"
          className="bi bi-coin"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
        </svg>
        <div className="text-sm">{coins} coin(s)</div>
      </span>
    </div>
    <ConfirmButton />
  </div>
);

const OtherVotes = ({ yesCount, noCount }) => (
  <div className="flex w-full flex-col items-center justify-between rounded-2xl border-2 border-gray-300 bg-white p-6 shadow-sm">
    <p className="font-semibold">See how others have voted</p>
    <GaugeComponent yesCount={yesCount} noCount={noCount} />
    <div className="flex w-full flex-row justify-between">
      <div className="font-semibold">{yesCount} Yes</div>
      <div className="font-semibold">{noCount} No</div>
    </div>
  </div>
);

const Predict = () => {
  const yesCount = 69;
  const noCount = 23;

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const { id } = useParams();
  const questionData = climateQns.find((qn) => qn.id === id);

  if (!questionData) {
    return <p>Question not found</p>;
  }

  return (
    <div className="flex flex-col bg-white">
      <div className="pb-4">
        <BackButton onClick={handleBackClick} />
        <h1 className="pt-4 text-left font-bold">
          Q{questionData.id}: {questionData.title}
        </h1>
      </div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:space-x-6">
        <Question question={questionData.question} />
        <OtherVotes yesCount={yesCount} noCount={noCount} />
      </div>
    </div>
  );
};

export default Predict;
