import { ReactElement, useCallback, useState } from "react";

import { Button } from "@headlessui/react";

import { TableGrid } from "../../../components/Grid/intex";
import AddJudge from "./components/addJudge";

import { judgesListHead } from "./Utils/tableHead";
import { JudgesType } from "./Types/judgesType";
import { useJudges } from "./Store/judgesStore";

export function JudgesList(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);

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
  let judgesDetails = JSON.parse(localStorage.getItem("judgesDetails") || "[]");

  function onEdit(row: JudgesType) {
    localStorage.setItem("editJudge", JSON.stringify(row));
    setIsOpen(true);
  }

  function onDelete() {}
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
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={() => {}}
        onDelete={onDelete}
        onEdit={onEdit}
      />{" "}
      {isOpen && <AddJudge isOpen={isOpen} handleClose={handleClose} />}
    </div>
  );
}
