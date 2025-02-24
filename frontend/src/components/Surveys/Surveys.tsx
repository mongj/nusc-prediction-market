import GreyedButton from "../../components/Buttons/GreyedButton/GreyedButton";
import YetToOpenBox from "../../components/StatusBoxes/YetToOpenBox";
import StartButton from "../Buttons/StartButton/StartButton.tsx";
import OpenedBox from "../StatusBoxes/OpenedBox.tsx";

const Surveys = () => {
  const handleStartClick = () => {
    window.location.href =
      "https://nus.au1.qualtrics.com/jfe/preview/previewId/03fabdca-5407-45e0-915d-068f597e4b04/SV_4H0mhef6WQA7GQK?Q_CHL=preview&Q_SurveyVersionID=current";
  };

  return (
    <div className="flex flex-col space-y-1 text-lg">
      <h2 className="text-left font-bold">Surveys</h2>
      <div className="flex flex-col justify-between rounded-2xl border-2 border-gray-300 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b-2 border-gray-300 px-4 py-2">
          <p className="text-base font-medium">Pre-Survey</p>
          <OpenedBox />
          <StartButton text="Start" onClick={handleStartClick} />
        </div>
        <div className="flex items-center justify-between p-2 px-4 py-2">
          <p className="text-base font-medium">Post-Survey</p>
          <YetToOpenBox />
          <GreyedButton text="Start" />
        </div>
      </div>
    </div>
  );
};

export default Surveys;
