import { ReactElement, useCallback, useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Datepickers from "../DatePicker/intex";
import { TimePickers } from "../TimePicker/intex";
import { useAddNewEvent } from "../../Store/addNewEventStore";

type AddEventType = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function AddEvent({
  isOpen,
  handleClose,
}: AddEventType): ReactElement {
  
  const setFieldValues = useAddNewEvent((state) => state.setFieldValues);
  const fieldValues = useAddNewEvent((state) => state.fieldValues);
  const clearFieldValues = useAddNewEvent((state) => state.clearFieldValues);

  function onCreateNewEvent() {
    let existingEvents = JSON.parse(
      localStorage.getItem("eventDetails") || "[]"
    );
    let eventsArray = Array.isArray(existingEvents) ? existingEvents : [];
    eventsArray.push(fieldValues);
    localStorage.setItem("eventDetails", JSON.stringify(eventsArray));
    handleClose();
    clearFieldValues();
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
                Add New Event
              </DialogTitle>
              <hr />
              <div className="flex flex-col gap-7 p-6">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="eventname">Event Name</label>
                    <input
                      type="text"
                      id="eventname"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={fieldValues?.eventname}
                      onChange={(e) =>
                        setFieldValues("eventname", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="date">Date</label>
                    <Datepickers
                      fieldValues={fieldValues}
                      setFieldValues={setFieldValues}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label htmlFor="venue">Venue</label>
                    <input
                      type="text"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={fieldValues?.venue}
                      onChange={(e) => setFieldValues("venue", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="time">Time</label>
                    <TimePickers
                      fieldValues={fieldValues}
                      setFieldValues={setFieldValues}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="mt-4 flex justify-end gap-5 p-6 pt-0">
                <Button
                  className="inline-flex items-center gap-2 rounded-md border-2 border-gray-500 py-1.5 px-3 text-sm/6 font-semibold text-gray-600 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={onCreateNewEvent}
                >
                  Submit
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
