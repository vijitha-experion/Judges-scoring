import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@headlessui/react";
import { eventList } from "./Utils/table";
import { tabledata } from "../../../data";
import AddEvent from "./components/AddEvent/intex";
import { TableGrid } from "../../../components/Grid/intex";

export function EventList(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function open() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onRowClick() {
    navigate("/programList");
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
        columns={eventList}
        data={tabledata}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={onRowClick}
      />{" "}
      {isOpen ? <AddEvent isOpen={isOpen} handleClose={handleClose} /> : null}
    </div>
  );
}
