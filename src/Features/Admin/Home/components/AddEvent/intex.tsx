import { ReactElement, useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

type AddEventType = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function AddEvent({
  isOpen,
  handleClose,
}: AddEventType): ReactElement {
  const [date, setDate] = useState<Date>();

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
              className="w-full max-w-lg rounded-xl bg-white p-6 font-semibold backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-medium ">
                Add New Event
              </DialogTitle>
              <div className="flex flex-col gap-7">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <label htmlFor="event">Event Name</label>
                    <input
                      type="button"
                      value="event"
                      className="w-64 border-2 h-8 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex gap-3 items-center">
                    <label htmlFor="date">Date</label>
                    <input
                      type="button"
                      value="date"
                      className="w-11 border-2 h-8 border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <label htmlFor="venue">Venue</label>
                    <input
                      type="button"
                      value="venue"
                      className="w-64 border-2 h-8 border-gray-300 rounded"
                    />
                  </div>
                  <div className="flex gap-3 items-center">
                    <label htmlFor="time">Time</label>
                    <input
                      type="button"
                      value="time"
                      className="w-11 border-2 h-8 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-5">
                <Button
                  className="inline-flex items-center gap-2 rounded-md border-2 border-gray-400 py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleClose}
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
