import { ReactElement, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../../../components/Grid/intex";
import AddNewProgram from "./components/AddNewProgram/intex";

import { programHead } from "../../Utils/table";
import { useAddProgram } from "./store/addProgram";
import { ProgramType } from "./Types/intex";
import { DialogBox } from "../../../../../components/Dialog/intext";

export function ProgramList(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);
  let [isDelete, setIsDelete] = useState(false);
  let [selectedRow, setSelectedRow] = useState<ProgramType | null>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const event = location.state?.event;

  const clearProgramValues = useAddProgram(
    useCallback((state) => state.clearProgramValues, [])
  );

  let programsList = JSON.parse(localStorage.getItem("programDetails") || "[]");
  const eventFilterProgram = programsList.filter(
    (item: ProgramType) => item.eventName === event.eventName
  );

  let formattedProgramsList = eventFilterProgram.map((program: any) => ({
    ...program,
    judges: program.judges?.[0]?.label || "",
    participant: program.participant?.[0]?.label || "",
  }));

  function open() {
    localStorage.removeItem("editProgram");
    clearProgramValues();
    setIsOpen(true);
  }

  function handleClose() {
    clearProgramValues();
    setIsOpen(false);
  }

  function onRowClick(row: ProgramType) {
    localStorage.setItem("selectedProgram", JSON.stringify(row));
    navigate("/participantsDetails", { state: { program: row.programName } });
  }

  function onEdit(row: ProgramType) {
    localStorage.setItem("editProgram", JSON.stringify(row));
    setIsOpen(true);
  }

  function handleDelete(row: ProgramType) {
    setSelectedRow(row);
    setIsDelete(true);
  }

  function handleDeleteClose() {
    setIsDelete(false);
    setSelectedRow(null);
  }

  function onConfirmDelete() {
    if (selectedRow) {
      const updatedEvents = programsList.filter((events: ProgramType) => {
        return !(
          events.programName === selectedRow?.programName &&
          events.eventName === selectedRow?.eventName
        );
      });
      localStorage.setItem("programDetails", JSON.stringify(updatedEvents));
      setIsDelete(false);
      setSelectedRow(null);
    }
  }

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
        onRowClick={onRowClick}
        onDelete={handleDelete}
        onEdit={onEdit}
      />{" "}
      {isOpen ? (
        <AddNewProgram
          isOpen={isOpen}
          handleClose={handleClose}
          event={event}
        />
      ) : null}
      {isDelete && (
        <DialogBox
          title="Delete Event"
          description="Are you sure you want to delete this Program?"
          button1="Cancel"
          button2="Delete"
          opened={isDelete}
          handleClose={handleDeleteClose}
          handleAction={onConfirmDelete}
        />
      )}
    </div>
  );
}
