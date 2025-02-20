import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@headlessui/react";
import { TableGrid } from "../../../../../components/Grid/intex";
import { participantDetailsHead } from "../../Utils/table";
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

  function onRowClick() {
    navigate("");
  }
  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Participants Details</p>
        <Button
          onClick={open}
          className="bg-indigo-600 py-1 px-5 rounded-md text-white"
        >
          Add
        </Button>
      </div>
      <TableGrid
        columns={participantDetailsHead}
        data={participantDetails}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={onRowClick}
      />{" "}
    </div>
  );
}
