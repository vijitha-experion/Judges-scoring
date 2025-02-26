import React, { ReactElement } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@headlessui/react";

type data = {
  title: string;
  description: string;
  button1: string;
  button2: string;
  opened: boolean;
  handleClose: () => void;
  handleAction: any;
};
export function DialogBox({
  title,
  description,
  button1,
  button2,
  opened,
  handleClose,
  handleAction,
}: data): ReactElement {
  return (
    <>
      <Dialog
        open={opened}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 w-screen">
          <div className="flex min-h-full items-start justify-center mt-32">
            <DialogPanel className="w-96 rounded-lg bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <div className="grid grid-cols-6 p-5">
                <DialogTitle as="h3" className="col-span-5">
                  <h1 className="font-semibold text-slate-900 flex">{title}</h1>
                </DialogTitle>
                <button
                  onClick={handleClose}
                  className="col-span-1 flex justify-end"
                >
                  <XMarkIcon className="h-6 w-6 text-slate-400" />
                </button>
              </div>
              <div className="pl-5 pr-5">
                <p className="text-sm text-slate-700">{description}</p>
              </div>
              <hr className="mt-3" />
              <div className="mt-4 flex justify-end gap-5 p-6 pt-0">
                <Button
                  className="inline-flex items-center gap-2 rounded-md border-2 border-gray-500 py-1.5 px-3 text-sm/6 font-semibold text-gray-600 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleClose}
                >
                  {button1}
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleAction}
                >
                  {button2}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>{" "}
    </>
  );
}
