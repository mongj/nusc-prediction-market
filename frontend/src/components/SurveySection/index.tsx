import { useEffect, useState } from "react";

import { APIResponse, api } from "@/api";
import { Button, Chip } from "@/components/primitives";
import { ChipColor } from "@/components/primitives/Chip";
import { Survey } from "@/types";
import { openExternalLink } from "@/utils";

enum SurveyStatus {
  YET_TO_START = "yet_to_start",
  PENDING = "pending",
  COMPLETED = "completed",
  CLOSED = "closed",
}

const SurveySection = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    api
      .get<APIResponse<Survey[]>>("/surveys")
      .then((response) => {
        setSurveys(Object.values(response.data.data));
      })
      .catch((error) => {
        console.error("Error fetching surveys:", error);
      });
  }, []);

  const getCompletionStatus = (survey: Survey): SurveyStatus => {
    if (survey.completed) {
      return SurveyStatus.COMPLETED;
    }
    if (survey.isClosed) {
      return SurveyStatus.CLOSED;
    }
    if (survey.openOn > new Date()) {
      return SurveyStatus.YET_TO_START;
    }
    return SurveyStatus.PENDING;
  };

  const getChipText = (status: SurveyStatus): string => {
    switch (status) {
      case SurveyStatus.COMPLETED:
        return "Completed";
      case SurveyStatus.CLOSED:
        return "Closed";
      case SurveyStatus.PENDING:
        return "Pending";
      case SurveyStatus.YET_TO_START:
        return "Yet to start";
    }
  };

  const getChipColor = (status: SurveyStatus): ChipColor => {
    switch (status) {
      case SurveyStatus.COMPLETED:
        return "green";
      case SurveyStatus.CLOSED:
        return "red";
      case SurveyStatus.PENDING:
        return "blue";
      case SurveyStatus.YET_TO_START:
        return "gray";
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-xl font-extrabold">Surveys</h2>
      <section className="flex flex-col justify-between rounded-2xl border border-neutral-300 bg-white shadow">
        {surveys.map((survey) => {
          const status = getCompletionStatus(survey);
          const chipText = getChipText(status);
          const chipColor = getChipColor(status);

          return (
            <div
              key={survey.id}
              className="grid grid-cols-3 items-center px-4 py-2 border-b border-neutral-300 last:border-b-0"
            >
              <p className="text-base font-medium">{survey.name}</p>
              <div className="flex justify-center">
                <Chip text={chipText} color={chipColor} />
              </div>
              <div className="flex justify-end">
                <Button
                  text="Start"
                  color="green"
                  onClick={() => openExternalLink(survey.link)}
                  className="w-32"
                  disabled={status !== SurveyStatus.PENDING}
                />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default SurveySection;
