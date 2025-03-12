import { ReactElement } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@headlessui/react";

type data = {
  opened: boolean;
  handleClose: () => void;
};

export function ScoreDetails({ opened, handleClose }: data): ReactElement {
  return (
    <Dialog
      open={opened}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClose}
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-y-0 right-0 w-[500px] max-w-full">
        <DialogPanel
          className={`h-full flex flex-col bg-white shadow-xl transform transition-transform duration-1000 ease-in-out ${
            opened ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="grid grid-cols-6 p-5">
            <DialogTitle as="h3" className="col-span-5">
              <h1 className="font-semibold text-slate-900 flex">
                Score Details
              </h1>
            </DialogTitle>
            <button
              onClick={handleClose}
              className="col-span-1 flex justify-end"
            >
              <XMarkIcon className="h-6 w-6 text-slate-400" />
            </button>
          </div>

          <div className="pl-5 pr-5 flex-1 overflow-y-auto">
            <p className="text-sm text-slate-700">description</p>
          </div>

          <hr className="mt-3" />
          <div className="mt-4 flex justify-end gap-5 p-6 pt-0">
            <Button
              className="inline-flex items-center gap-2 rounded-md border-2 border-gray-600 py-1.5 px-4 hover:bg-zinc-200 text-sm/6 font-semibold text-gray-600 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
