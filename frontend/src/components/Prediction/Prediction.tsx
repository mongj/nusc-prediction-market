import { useNavigate } from "react-router-dom";

import Button from "../../components/Buttons/Button/Button";
import PendingBox from "../../components/StatusBoxes/PendingBox";
import climateQns from "../../storage/ClimateQuestionBank.json";

const Prediction = () => {
  const navigate = useNavigate();
  const handleEnterClick = (id) => {
    navigate(`/predict/${id}`);
  };

  return (
    <div className="flex flex-col space-y-1 text-lg">
      <h2 className="text-left font-bold">Make Your Prediction</h2>
      <div className="flex flex-col justify-between overflow-auto rounded-2xl border-2 border-gray-300 bg-white shadow-sm">
        {climateQns.map((question) => (
          <div className="flex items-center justify-between border-gray-300 px-4 py-2" key={question.id}>
            <div className="flex w-full flex-row justify-between pr-16">
              <p className="text-base font-medium">1 Jan</p>
              <p className="text-base font-medium">{question.title}</p>
              <PendingBox />
            </div>
            <Button text="Enter" onClick={() => handleEnterClick(question.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prediction;
