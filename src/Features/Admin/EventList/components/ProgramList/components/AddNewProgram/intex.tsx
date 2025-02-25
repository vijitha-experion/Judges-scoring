import { ReactElement, useCallback } from "react";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import Datepickers from "../../../DatePicker/intex";
import { TimePickers } from "../../../TimePicker/intex";
import { useAddProgram } from "../../store/addProgram";
import { ReactSelect } from "../../../../../../../components/ReactSelect/intex";

type AddNewProgramType = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function AddNewProgram({
  isOpen,
  handleClose,
}: AddNewProgramType): ReactElement {
  const setProgramValues = useAddProgram(
    useCallback((state) => state.setProgramValues, [])
  );
  const programValues = useAddProgram(
    useCallback((state) => state.programValues, [])
  );
  const clearProgramValues = useAddProgram(
    useCallback((state) => state.clearProgramValues, [])
  );

  function onCreateNewProgram() {
    let existingProgram = JSON.parse(
      localStorage.getItem("programDetails") || "[]"
    );
    let programArray = Array.isArray(existingProgram) ? existingProgram : [];
    programArray.push(programValues);
    localStorage.setItem("programDetails", JSON.stringify(programArray));
    handleClose();
    clearProgramValues();
    handleClose();
  }

  const judgesOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
    { value: "G", label: "G" },
  ];

  const participantOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
    { value: "G", label: "G" },
  ];
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
                Add New Program
              </DialogTitle>
              <hr />
              <div className="flex flex-col gap-7 p-6">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="programname">Program Name</label>
                    <input
                      type="text"
                      id="programname"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={programValues?.programname}
                      onChange={(e) =>
                        setProgramValues("programname", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="date">Date</label>
                    <Datepickers
                      fieldValues={programValues}
                      setFieldValues={setProgramValues}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label htmlFor="description">Venue</label>
                    <input
                      type="text"
                      id="description"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={programValues?.description}
                      onChange={(e) =>
                        setProgramValues("description", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="time">Time</label>
                    <TimePickers
                      fieldValues={programValues}
                      setFieldValues={setProgramValues}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="judges">Judges names</label>
                  <ReactSelect
                    options={judgesOptions}
                    id="judges"
                    setSelectedOptions={(e) => {
                      setProgramValues("judges", e);
                    }}
                    value={programValues?.judges}
                    isSearchable={true}
                    menuPlacement="top"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="participant">Participant names</label>
                  <ReactSelect
                    options={participantOptions}
                    id="participant"
                    setSelectedOptions={(e) => {
                      setProgramValues("participant", e);
                    }}
                    value={programValues?.participant}
                    isSearchable={true}
                    menuPlacement="top"
                  />
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
                  onClick={onCreateNewProgram}
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
