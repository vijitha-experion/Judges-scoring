import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@headlessui/react";
import { TableGrid } from "../../../../../components/Grid/intex";
import AddEvaluationPoint from "./components/AddEvaluationPoint/intex";

import { evaluationHead, participantDetailsHead } from "../../Utils/table";
import { participantDetails } from "../../../../../data";

export function ParticipantsDetails(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  function open() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onRowClick() {}

  let evaluationArray = JSON.parse(
    localStorage.getItem("EvaluationPoints") || "[]"
  );
  console.log(evaluationArray, "evaluationArray");
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
        data={evaluationArray}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={onRowClick}
      />{" "}
      <p className="font-semibold text-xl">Participant Details</p>
      <TableGrid
        columns={participantDetailsHead}
        data={participantDetails}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={onRowClick}
      />{" "}
      {isOpen ? (
        <AddEvaluationPoint isOpen={isOpen} handleClose={handleClose} />
      ) : null}
    </div>
  );
}
