import { ReactElement, useCallback, useState } from "react";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../components/Grid/intex";
import AddParticipant from "./components/AddParticipant/intex";

import { ParticipantList } from "../../../data";
import { participantListHead } from "./Utils/participantTable";
import { ParticipantType } from "./Types/participantType";
import { useParticipant } from "./Store/participantStore";

export function ParticipantsList(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);

  const existingParticipant = JSON.parse(
    localStorage.getItem("ParticipantDetails") || "[]"
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
  function onDelete() {}

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
        onDelete={onDelete}
        onEdit={onEdit}
      />{" "}
      {isOpen && <AddParticipant isOpen={isOpen} handleClose={handleClose} />}
    </div>
  );
}
