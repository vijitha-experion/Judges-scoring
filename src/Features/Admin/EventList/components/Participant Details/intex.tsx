import { ReactElement, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../../../components/Grid/intex";
import AddEvaluationPoint from "./components/AddEvaluationPoint/intex";

import { ProgramType } from "../ProgramList/Types/intex";
import { evaluationHead, participantDetailsHead } from "../../Utils/table";
import { participantDetails } from "../../../../../data";
import { useEvaluationPoint } from "./store/evaluationPoint";

export function ParticipantsDetails(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);

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

  let existingProgram = JSON.parse(
    localStorage.getItem("programDetails") || "[]"
  );

  const filteredProgram = existingProgram.find(
    (item: ProgramType) => item?.programname === program
  );
  const evaluationPoints = filteredProgram?.evaluationPoints || [];

  let score = JSON.parse(localStorage.getItem("scoreDetails") || "[]");

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
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={() => {}}
        showActions={false}
        onDelete={null}
        onEdit={null}
      />{" "}
      <p className="font-semibold text-xl pt-5">Final Score Details</p>
      <TableGrid
        columns={participantDetailsHead}
        data={score}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={() => {}}
        showActions={false}
        onDelete={null}
        onEdit={null}
      />{" "}
      {isOpen ? (
        <AddEvaluationPoint isOpen={isOpen} handleClose={handleClose} />
      ) : null}
    </div>
  );
}
