import { ReactElement, useState } from "react";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../components/Grid/intex";

import { judgesList } from "../../../data";
import { judgesListHead } from "./Utils/tableHead";

export function JudgesList(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onEdit (){
    
  }
  function onDelete() {

  }
  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Judges List</p>
        <Button
          onClick={open}
          className="bg-indigo-600 py-1 px-5 rounded-md text-white"
        >
          Add
        </Button>
      </div>
      <TableGrid
        columns={judgesListHead}
        data={judgesList}
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
