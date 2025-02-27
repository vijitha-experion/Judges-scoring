import { ReactElement, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../../../components/Grid/intex";
import AddNewProgram from "./components/AddNewProgram/intex";

import { programHead } from "../../Utils/table";
import { useAddProgram } from "./store/addProgram";

export function ProgramList(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const clearProgramValues = useAddProgram(
    useCallback((state) => state.clearProgramValues, [])
  );

  let programsList = JSON.parse(localStorage.getItem("programDetails") || "[]");
  let formattedProgramsList = programsList.map((program: any) => ({
    ...program,
    judges: program.judges?.[0]?.value || "",
    participant: program.participant?.[0]?.value || "",
  }));

  function open() {
    clearProgramValues();
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onRowClick() {
    navigate("/participantsDetails");
  }

  function onEdit() {}
  function onDelete() {}
  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Program List</p>
        <Button
          className="bg-indigo-600 py-1 px-5 rounded-md text-white"
          onClick={open}
        >
          Add New Program
        </Button>
      </div>
      <TableGrid
        columns={programHead}
        data={formattedProgramsList}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={onRowClick}
        onDelete={onDelete}
        onEdit={onEdit}
      />{" "}
      {isOpen ? (
        <AddNewProgram isOpen={isOpen} handleClose={handleClose} />
      ) : null}
    </div>
  );
}
