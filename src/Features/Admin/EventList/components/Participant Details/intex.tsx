import { ReactElement, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../../../components/Grid/intex";
import AddEvaluationPoint from "./components/AddEvaluationPoint/intex";

import { ProgramType } from "../ProgramList/Types/intex";
import { evaluationHead, participantDetailsHead } from "../../Utils/table";
import { useEvaluationPoint } from "./store/evaluationPoint";
import { ParticipantScoreType } from "../../../../User/JudgesScoringPage/Types/participantScore";

export function ParticipantsDetails(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const program = location.state?.program;

  const clearEvaluationValues = useEvaluationPoint(
    useCallback((state) => state.clearEvaluationValues, [])
  );

  function open() {
    setIsOpen(true);
  }

  function handleClose() {
    clearEvaluationValues();
    setIsOpen(false);
  }

  const existingProgram = JSON.parse(
    localStorage.getItem("programDetails") || "[]"
  );

  const filteredProgram = existingProgram.find(
    (item: ProgramType) => item?.programName === program
  );
  const evaluationPoints = filteredProgram?.evaluationPoints || [];

  const score = JSON.parse(localStorage.getItem("scoreDetails") || "[]");

  const groupedScores = Object.values(
    score.reduce((acc: Record<string, ParticipantScoreType>, item: any) => {
      if (!item || typeof item !== "object" || !item.participantName) {
        return acc;
      }
      const key = `${item.eventName}-${item.programName}-${item.participantName}`;
      if (acc[key]) {
        acc[key].score += item.score;
      } else {
        acc[key] = { ...item };
      }
      return acc;
    }, {})
  );

  groupedScores.sort((a: any, b: any) => b.score - a.score);

  const finalScores = groupedScores.map((item: any, index) => ({
    ...item,
    position: index + 1,
  }));

  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Evaluation Points</p>
        <Button
          onClick={open}
          className="bg-indigo-600 py-1 px-5 rounded-md text-white"
        >
          Add points
        </Button>
      </div>
      <TableGrid
        columns={evaluationHead}
        data={evaluationPoints}
        onRowClick={() => {}}
        showActions={false}
        onDelete={null}
        onEdit={null}
      />{" "}
      {score.eventName === filteredProgram.eventName &&
      score.programname === filteredProgram.programName ? (
        <div>
          <p className="font-semibold text-xl pt-5">Final Score Details</p>
          <TableGrid
            columns={participantDetailsHead}
            data={finalScores}
            onRowClick={() => {}}
            showActions={false}
            onDelete={null}
            onEdit={null}
          />
        </div>
      ) : null}
      {isOpen ? (
        <AddEvaluationPoint isOpen={isOpen} handleClose={handleClose} />
      ) : null}
    </div>
  );
}
