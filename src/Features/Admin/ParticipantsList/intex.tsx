import { ReactElement, useState } from "react";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../components/Grid/intex";

import { ParticipantList } from "../../../data";
import { participantListHead } from "./Utils/participantTable";

export function ParticipantsList(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onEdit() {}
  function onDelete() {}

  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Participant List</p>
        <Button
          onClick={open}
          className="bg-indigo-600 py-1 px-5 rounded-md text-white"
        >
          Add
        </Button>
      </div>
      <TableGrid
        columns={participantListHead}
        data={ParticipantList}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={null}
        onDelete={onDelete}
        onEdit={onEdit}
      />{" "}
    </div>
  );
}
