import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import YetToStartBox from "../../components/StatusBoxes/YetToStartBox";

const Progress = ({ progress }) => (
  <div className="flex flex-col space-y-1 text-lg">
    <div className="flex flex-col justify-between rounded-2xl border-2 border-gray-300 bg-white px-6 py-4 shadow-sm">
      <h2 className="text-left font-bold">My Progress</h2>
      <p className="pb-2 pt-4 text-left text-sm font-semibold">{progress.questionsAnswered}/30 questions answered</p>
      <div className="relative h-3 overflow-hidden rounded-lg bg-gray-300">
        <div
          className="transition-width h-full bg-blue-500 duration-300 ease-in-out"
          style={{ width: `${(progress.questionsAnswered / 30) * 100}%` }}
        ></div>
      </div>
      {progress.milestones.map((milestone, index) => (
        <div key={index} className="flex flex-col items-start overflow-auto py-2">
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel2-content" id="panel2-header">
              <p className="text-md pr-10 font-medium">Milestone {index + 1}</p>
              <YetToStartBox />
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex justify-start space-x-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${i < milestone.answered ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <p className="pt-1 text-left text-sm text-gray-500">
                {milestone.answered + 1 < 5
                  ? `Answer ${4 - milestone.answered} more question(s) to get the bonus for this milestone`
                  : "You have achieved the bonus for this milestone!"}
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  </div>
);

export default Progress;
