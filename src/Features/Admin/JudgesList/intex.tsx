import { ReactElement, useCallback, useState } from "react";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../components/Grid/intex";
import AddJudge from "./components/AddJudge/intex";
import { DialogBox } from "../../../components/Dialog/intext";

import { judgesListHead } from "./Utils/tableHead";
import { JudgesListType, JudgesType } from "./Types/judgesType";
import { useJudges } from "./Store/judgesStore";

export function JudgesList(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState<JudgesType | null>(null);

  const clearJudgesValue = useJudges(
    useCallback((state) => state.clearJudgesValue, [])
  );
  function open() {
    clearJudgesValue();
    setIsOpen(true);
  }

  function handleClose() {
    clearJudgesValue();
    setIsOpen(false);
  }
  const judgesDetails = JSON.parse(
    localStorage.getItem("judgesDetails") || "[]"
  );
  const judgesLists = JSON.parse(localStorage.getItem("judgesList") || "[]");

  function onEdit(row: JudgesType) {
    localStorage.setItem("editJudge", JSON.stringify(row));
    setIsOpen(true);
  }

  function handleDelete(row: JudgesType) {
    setSelectedRow(row);
    setIsDelete(true);
  }

  function handleDeleteClose() {
    setIsDelete(false);
    setSelectedRow(null);
  }

  function onConfirmDelete() {
    if (selectedRow) {
      const updatedJudges = judgesDetails.filter(
        (judge: JudgesType) => judge.phone !== selectedRow?.phone
      );
      localStorage.setItem("judgesDetails", JSON.stringify(updatedJudges));

      const updatedJudgesList = judgesLists.filter(
        (judgesList: JudgesListType) => judgesList.value !== selectedRow?.phone
      );
      localStorage.setItem("judgesList", JSON.stringify(updatedJudgesList));
      setIsDelete(false);
      setSelectedRow(null);
    }
  }
  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Judges List</p>
        <Button
          onClick={open}
          className="bg-indigo-600 py-1 px-5 rounded-md text-white"
        >
          Add Judge
        </Button>
      </div>
      <TableGrid
        columns={judgesListHead}
        data={judgesDetails}
        onRowClick={() => {}}
        onDelete={handleDelete}
        onEdit={onEdit}
      />{" "}
      {isOpen && <AddJudge isOpen={isOpen} handleClose={handleClose} />}
      {isDelete && (
        <DialogBox
          title="Delete Event"
          description="Are you sure you want to delete this judge details?"
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
