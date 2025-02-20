import { ReactElement, useState } from "react";

import { Button } from "@headlessui/react";
import { columns } from "./Utils/tableHead";
import { tabledata } from "../../../data";
import AddEvent from "./components/AddEvent/intex";
import { TableGrid } from "../../../components/Grid/intex";

export function Home(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Event List</p>
        <Button
          onClick={open}
          className="bg-indigo-600 py-1 px-5 rounded-md text-white"
        >
          Add
        </Button>
      </div>
      <TableGrid
        columns={columns}
        data={tabledata}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
      />{" "}
      {isOpen ? <AddEvent isOpen={isOpen} handleClose={handleClose} /> : null}
    </div>
  );
}
