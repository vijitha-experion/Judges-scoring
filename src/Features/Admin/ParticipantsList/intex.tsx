import { ReactElement, useCallback, useState } from "react";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../components/Grid/intex";
import AddParticipant from "./components/AddParticipant/intex";
import { DialogBox } from "../../../components/Dialog/intext";

import { participantListHead } from "./Utils/participantTable";
import { ParticipantListType, ParticipantType } from "./Types/participantType";
import { useParticipant } from "./Store/participantStore";

export function ParticipantsList(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ParticipantType | null>(null);

  const existingParticipant = JSON.parse(
    localStorage.getItem("ParticipantDetails") || "[]"
  );

  const participantList = JSON.parse(
    localStorage.getItem("participantList") || "[]"
  );

  const clearParticipantValue = useParticipant(
    useCallback((state) => state.clearParticipantValue, [])
  );

  function open() {
    clearParticipantValue();
    setIsOpen(true);
  }

  function handleClose() {
    clearParticipantValue();
    setIsOpen(false);
  }

  function onEdit(row: ParticipantType) {
    localStorage.setItem("editParticipant", JSON.stringify(row));
    setIsOpen(true);
  }

  function handleDelete(row: ParticipantType) {
    setSelectedRow(row);
    setIsDelete(true);
  }

  function handleDeleteClose() {
    setIsDelete(false);
    setSelectedRow(null);
  }

  function onConfirmDelete() {
    if (selectedRow) {
      const updatedParticipant = existingParticipant.filter(
        (participant: ParticipantType) =>
          participant.phone !== selectedRow?.phone
      );
      localStorage.setItem(
        "ParticipantDetails",
        JSON.stringify(updatedParticipant)
      );
      const updatedParticipantList = participantList.filter(
        (participantList: ParticipantListType) =>
          participantList.value !== selectedRow?.phone
      );
      localStorage.setItem(
        "participantList",
        JSON.stringify(updatedParticipantList)
      );
      setIsDelete(false);
      setSelectedRow(null);
    }
  }

  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Participant List</p>
        <Button
          onClick={open}
          className="bg-indigo-600 py-1 px-5 rounded-md text-white"
        >
          Add Participant
        </Button>
      </div>
      <TableGrid
        columns={participantListHead}
        data={existingParticipant}
        onRowClick={() => {}}
        onDelete={handleDelete}
        onEdit={onEdit}
      />{" "}
      {isOpen && <AddParticipant isOpen={isOpen} handleClose={handleClose} />}
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
