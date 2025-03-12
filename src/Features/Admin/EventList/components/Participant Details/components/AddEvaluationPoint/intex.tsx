import { ReactElement, useCallback, useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEvaluationPoint } from "../../store/evaluationPoint";
import { ProgramType } from "../../../ProgramList/Types/intex";

type AddEventType = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function AddEvaluationPoint({
  isOpen,
  handleClose,
}: AddEventType): ReactElement {
  const setEvaluationValues = useEvaluationPoint(
    useCallback((state) => state.setEvaluationValues, [])
  );
  const evaluationValues = useEvaluationPoint(
    useCallback((state) => state.evaluationValues, [])
  );
  const clearEvaluationValues = useEvaluationPoint(
    useCallback((state) => state.clearEvaluationValues, [])
  );

  function onCreateNewPoint() {
    const selectedProgram = JSON.parse(
      localStorage.getItem("selectedProgram") || "null"
    );
    let existingProgram = JSON.parse(
      localStorage.getItem("programDetails") || "[]"
    );

    if (Array.isArray(existingProgram)) {
      existingProgram = existingProgram.map((program: ProgramType) =>
        program.programName === selectedProgram?.programName
          ? {
              ...program,
              evaluationPoints: [
                ...(program.evaluationPoints || []),
                evaluationValues,
              ],
            }
          : program
      );
    }

    localStorage.setItem("programDetails", JSON.stringify(existingProgram));

    handleClose();
    clearEvaluationValues();
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
                Add New Evaluation Point
              </DialogTitle>
              <hr />
              <div className="flex flex-col p-6 gap-2">
                <label htmlFor="evaluationpoint">Point</label>
                <input
                  type="text"
                  id="evaluationpoint"
                  className="w-full border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                  value={evaluationValues?.evaluationpoint}
                  onChange={(e) =>
                    setEvaluationValues("evaluationpoint", e.target.value)
                  }
                />
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
                  onClick={onCreateNewPoint}
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
