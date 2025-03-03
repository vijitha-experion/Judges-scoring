import { ReactElement, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@headlessui/react";

import AddEvent from "./components/AddEvent/intex";
import { TableGrid } from "../../../components/Grid/intex";
import { DialogBox } from "../../../components/Dialog/intext";

import { eventListHead } from "./Utils/table";
import { EventType } from "./Types/table";
import { useAddNewEvent } from "./Store/addNewEventStore";

export function EventList(): ReactElement {
  let [isOpen, setIsOpen] = useState(false);
  let [isDelete, setIsDelete] = useState(false);
  let [selectedRow, setSelectedRow] = useState<EventType | null>(null);

  const navigate = useNavigate();

  const clearEventValue = useAddNewEvent(
    useCallback((state) => state.clearEventValue, [])
  );

  function open() {
    clearEventValue();
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onRowClick(row: EventType) {
    navigate("/programList", { state: { event: row.eventname } });
  }

  let eventsArray = JSON.parse(localStorage.getItem("eventDetails") || "[]");

  function onEdit(row: EventType) {
    localStorage.setItem("editEvent", JSON.stringify(row));
    setIsOpen(true);
  }

  function handleDelete(row: EventType) {
    setSelectedRow(row);
    setIsDelete(true);
  }

  function handleDeleteClose() {
    setIsDelete(false);
    setSelectedRow(null);
  }

  function onConfirmDelete() {
    if (selectedRow) {
      const updatedEvents = eventsArray.filter(
        (event: EventType) => event.eventname !== selectedRow?.eventname
      );

      localStorage.setItem("eventDetails", JSON.stringify(updatedEvents));

      setIsDelete(false);
      setSelectedRow(null);
    }
  }

  return (
    <div className="pl-14 mr-14">
      <div className="flex justify-between items-center pt-10">
        <p className="font-semibold text-xl">Event List</p>
        <Button
          onClick={open}
          className="bg-indigo-600 py-1 px-5 rounded-md text-white"
        >
          Add New Event
        </Button>
      </div>
      <TableGrid
        columns={eventListHead}
        data={eventsArray}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log("Go to page:", page)}
        onRowClick={onRowClick}
        onDelete={handleDelete}
        onEdit={onEdit}
      />
      {isOpen && <AddEvent isOpen={isOpen} handleClose={handleClose} />}
      {isDelete && (
        <DialogBox
          title="Delete Event"
          description="Are you sure you want to delete this Event?"
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
