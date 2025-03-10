import { ReactElement, useCallback } from "react";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import Datepickers from "../DatePicker/intex";
import { TimePickers } from "../TimePicker/intex";

import { useAddNewEvent } from "../../Store/addNewEventStore";
import {
  dateWarning,
  eventDuplicate,
  eventWarning,
  timeWarning,
  venuWarning,
} from "./Utils/intex";
import { EventType } from "../../Types/table";

type AddEventType = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function AddEvent({
  isOpen,
  handleClose,
}: AddEventType): ReactElement {
  const setEventValue = useAddNewEvent(
    useCallback((state) => state.setEventValue, [])
  );
  const eventValue = useAddNewEvent(
    useCallback((state) => state.eventValue, [])
  );
  const clearEventValue = useAddNewEvent(
    useCallback((state) => state.clearEventValue, [])
  );

  const showWarning = useAddNewEvent(
    useCallback((state) => state.showWarning, [])
  );

  const warningType = showWarning(eventValue, "eventName");

  function onCreateNewEvent() {
    let existingEvents = JSON.parse(
      localStorage.getItem("eventDetails") || "[]"
    );
    let eventsArray = Array.isArray(existingEvents) ? existingEvents : [];
    eventsArray.push(eventValue);
    localStorage.setItem("eventDetails", JSON.stringify(eventsArray));
    handleClose();
    clearEventValue();
  }

  function checkDisable() {
    return (
      (!eventValue?.eventName?.trim() && !filteredEvent?.eventName?.trim()) ||
      (!eventValue?.venue?.trim() && !filteredEvent?.venue?.trim()) ||
      (!eventValue?.startDate && !filteredEvent?.startDate) ||
      (!eventValue?.time && !filteredEvent?.time) ||
      showWarning(eventValue, "eventName") ||
      showWarning(eventValue, "venue") ||
      showWarning(eventValue, "startDate") ||
      showWarning(eventValue, "time")
    );
  }

  function onCancel() {
    handleClose();
    clearEventValue();
  }

  const editEvent = JSON.parse(localStorage.getItem("editEvent") || "null");
  const existingEvents = JSON.parse(
    localStorage.getItem("eventDetails") || "[]"
  );
  const filteredEvent = existingEvents.find(
    (item: EventType) => item?.eventName === editEvent?.eventName
  );

  function onEditEvent() {
    const updatedEvent = { ...filteredEvent, ...eventValue };
    const newEventArray = existingEvents.map((event: EventType) =>
      event?.eventName === filteredEvent?.eventName ? updatedEvent : event
    );
    localStorage.setItem("eventDetails", JSON.stringify(newEventArray));
    localStorage.removeItem("editEvent");
    handleClose();
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 w-screen">
          <div className="flex min-h-full items-start justify-center mt-32">
            <DialogPanel
              transition
              className="w-full max-w-lg rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-semibold p-6 pb-3">
                {editEvent ? "Edit Event" : "Add New Event"}
              </DialogTitle>
              <hr />
              <div className="flex flex-col gap-7 p-6">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="eventName">Event Name</label>
                    <input
                      type="text"
                      id="eventName"
                      className={`w-64 border-2 h-8 border-gray-300 rounded pl-2 ${
                        filteredEvent ? "text-gray-400" : "text-gray-700"
                      }`}
                      value={
                        eventValue?.eventName ?? filteredEvent?.eventName ?? ""
                      }
                      disabled={filteredEvent}
                      onChange={(e) => {
                        setEventValue("eventName", e.target.value);
                      }}
                    />
                    {warningType === "empty" && (
                      <p className="text-red-500 text-sm">{eventWarning}</p>
                    )}
                    {warningType === "duplicate" && (
                      <p className="text-red-500 text-sm">{eventDuplicate}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="date">Date</label>
                    <Datepickers
                      fieldValues={eventValue}
                      setFieldValues={setEventValue}
                      filteredEvent={filteredEvent}
                    />
                    {showWarning(eventValue, "startDate") && (
                      <p className="text-red-500 text-sm">{dateWarning}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label htmlFor="venue">Venue</label>
                    <input
                      type="text"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={eventValue?.venue ?? filteredEvent?.venue ?? ""}
                      onChange={(e) => setEventValue("venue", e.target.value)}
                    />
                    {showWarning(eventValue, "venue") && (
                      <p className="text-red-500 text-sm">{venuWarning}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="time">Time</label>
                    <TimePickers
                      fieldValues={eventValue}
                      setFieldValues={setEventValue}
                      filteredEvent={filteredEvent}
                    />
                    {showWarning(eventValue, "time") && (
                      <p className="text-red-500 text-sm">{timeWarning}</p>
                    )}
                  </div>
                </div>
              </div>
              <hr />
              <div className="mt-4 flex justify-end gap-5 p-6 pt-0">
                <Button
                  className="inline-flex items-center gap-2 rounded-md border-2 border-gray-500 py-1.5 px-3 text-sm/6 font-semibold text-gray-600 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  className={`inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none  ${
                    checkDisable()
                      ? "bg-indigo-400 text-gray-200 cursor-not-allowed"
                      : "bg-indigo-500 text-white hover:bg-indigo-600"
                  }`}
                  disabled={checkDisable()}
                  onClick={editEvent ? onEditEvent : onCreateNewEvent}
                >
                  {editEvent ? "Update" : "Add"}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
