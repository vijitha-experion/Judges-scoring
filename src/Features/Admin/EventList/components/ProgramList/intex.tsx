import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../../../components/Grid/intex";
import AddNewProgram from "./components/AddNewProgram/intex";

import { programList } from "../../../../../data";
import { programHead } from "../../Utils/table";

export function ProgramList(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function open() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onRowClick() {
    navigate("/participantsDetails");
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
        data={programList}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={onRowClick}
      />{" "}
      {isOpen ? (
        <AddNewProgram isOpen={isOpen} handleClose={handleClose} />
      ) : null}
    </div>
  );
}
