import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useEffect, useState } from "react";

import { api } from "@/api";
import { APIResponse } from "@/api/types";
import { Market } from "@/types/market";

enum QuestionStatus {
  ATTEMPTED = "attempted",
  MISSING = "missing",
  PENDING = "pending",
}

const getBubbleStyleByStatus = (status: QuestionStatus) => {
  switch (status) {
    case QuestionStatus.ATTEMPTED:
      return "bg-lime-600 text-white shadow-lg transform scale-110 milestone-bubble completed";
    case QuestionStatus.MISSING:
      return "bg-red-600 text-white milestone-bubble";
    case QuestionStatus.PENDING:
    default:
      return "bg-gradient-to-b from-gray-200 to-gray-300 text-gray-600 milestone-bubble";
  }
};

const getMilestoneBonusText = (milestone: QuestionStatus[]) => {
  const MIN_ATTEMPTS_REQUIRED = 4;
  const attempts = milestone.filter((status) => status === QuestionStatus.ATTEMPTED).length;
  if (attempts >= MIN_ATTEMPTS_REQUIRED) {
    return "Nice! You have achieved the bonus for this milestone!";
  }
  const isMilestoneOver = milestone.filter((status) => status === QuestionStatus.PENDING).length === 0;
  if (isMilestoneOver) {
    return "Sorry, you have missed the bonus for this milestone.";
  }
  const remainingAttemptsNeeded = MIN_ATTEMPTS_REQUIRED - attempts;
  return `Answer ${remainingAttemptsNeeded} more question${remainingAttemptsNeeded > 1 ? "s" : ""} to get the bonus for this milestone`;
};

const Progress = () => {
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    api
      .get<APIResponse<Market[]>>("/markets")
      .then((response) => {
        setMarkets(Object.values(response.data.data));
      })
      .catch((error) => {
        console.error("Error fetching markets:", error);
      });
  }, []);

  const questionsAnswered = markets.filter((market) => market.hasAnswered).length;

  // Sort markets by ID to ensure correct milestone grouping
  const sortedMarkets = [...markets].sort((a, b) => a.id - b.id);

  // Determine if this is control group based on market IDs
  // Control group: markets start from ID 1, Treatment group: markets start from ID 31
  const isControlGroup = sortedMarkets.length > 0 && sortedMarkets[0].id < 31;
  const baseMarketId = isControlGroup ? 1 : 31;

  const milestones = Array.from({ length: 5 }, (_, milestoneIndex) => {
    const milestoneMarkets = Array.from({ length: 6 }, (_, marketIndex) => {
      const expectedMarketId = baseMarketId + (milestoneIndex * 6) + marketIndex;
      const market = sortedMarkets.find(m => m.id === expectedMarketId);

      if (!market) {
        return QuestionStatus.PENDING;
      }

      if (market.hasAnswered) {
        return QuestionStatus.ATTEMPTED;
      }

      const now = new Date();
      if (new Date(market.closeOn) < now) {
        return QuestionStatus.MISSING;
      }

      return QuestionStatus.PENDING;
    });

    return milestoneMarkets;
  });

  return (
    <div className="flex flex-col space-y-1 text-lg">
      <div className="duolingo-card flex flex-col justify-between px-6 py-4">
        <h2 className="text-left font-extrabold font-nunito">My Progress</h2>
        <p className="pb-2 pt-4 text-left text-base font-nunito font-bold">{questionsAnswered}/30 Questions Answered</p>
        <div className="relative h-4 overflow-hidden rounded-lg bg-gray-300 border-2 border-gray-400">
          <div
            className="progress-shine h-full bg-lime-500 transition-all duration-500 ease-out"
            style={{ width: `${(questionsAnswered / 30) * 100}%` }}
          ></div>
          {questionsAnswered === 30 && (
            <div className="absolute -top-2 right-0 text-yellow-400 animate-bounce text-lg">
              ⭐
            </div>
          )}
        </div>
        {milestones.map((milestone, milestoneIdx) => (
          <div key={milestoneIdx} className="flex flex-col items-start overflow-auto py-2">
            <Accordion>
              <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel2-content" id="panel2-header">
                <p className="text-md pr-10 font-nunito font-bold">Milestone {milestoneIdx + 1}</p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex justify-start space-x-2">
                  {milestone.map((status, marketIdx) => {
                    const expectedMarketId = baseMarketId + (milestoneIdx * 6) + marketIdx;
                    const market = sortedMarkets.find(m => m.id === expectedMarketId);
                    const displayNumber = (milestoneIdx * 6) + marketIdx + 1; // Always show 1-30
                    
                    return (
                      <div
                        key={marketIdx}
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold cursor-pointer ${getBubbleStyleByStatus(status)}`}
                        title={market ? `Question ${displayNumber} (Market ${market.id}): ${market.name}` : `Question ${displayNumber} (Market ${expectedMarketId} not found)`}
                      >
                        {displayNumber}
                        {status === QuestionStatus.ATTEMPTED && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center border border-yellow-600">
                            <span className="text-xs text-yellow-900">✓</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="pt-1 text-left text-sm text-gray-500">{getMilestoneBonusText(milestone)}</p>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
