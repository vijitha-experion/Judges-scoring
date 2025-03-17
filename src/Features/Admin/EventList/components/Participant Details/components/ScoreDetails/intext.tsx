import { ReactElement } from "react";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@headlessui/react";

import { finalScoreType } from "./Types/scoreType";

type data = {
  opened: boolean;
  handleClose: () => void;
};

export function ScoreDetails({ opened, handleClose }: data): ReactElement {
  const singleScore = JSON.parse(localStorage.getItem("singleScore") || "{}");
  const score = JSON.parse(localStorage.getItem("scoreDetails") || "[]");

  const filteredList = score.filter(
    (item: any) =>
      item.eventName === singleScore.eventName &&
      item.programName === singleScore.programName &&
      item.participantName === singleScore.participantName
  );

  console.log(filteredList, "filteredList");
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
          <div className="grid grid-cols-6 p-5 border border-b border-gray-300 ">
            <DialogTitle as="h3" className="col-span-5">
              <h1 className="font-semibold text-slate-900 text-lg">
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

          <div className="p-5 flex-1 overflow-y-auto space-y-3 font-semibold">
            <p className="text-slate-900">
              {singleScore.eventName} ({singleScore.programName})
            </p>
            <div className="space-y-3">
              <p className="text-slate-700 text-sm">
              participantName: {singleScore.participantName}
              </p>
              <p className="text-slate-700 text-sm">
                Position: {singleScore.position}
              </p>
              <p className="text-slate-700 text-sm">
                Total Score: {singleScore.score}
              </p>
              <h1>Evaluation Point and mark</h1>
              {filteredList.map((item: any) => (
                <div className="flex gap-2">
                  <p className="text-slate-700 text-sm">
                    Judge Name: {item.judgeName}
                  </p>
                  {item.existingEvalute.map((point: any) => (
                    <div>
                      <p className="text-slate-700 text-sm">
                        {point.evaluationpoint}
                      </p>
                      <p className="text-slate-700 text-sm">{point.mark}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-5 p-6 border border-t border-gray-300">
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
