import { ReactElement, useCallback, useEffect } from "react";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import Datepickers from "../../../DatePicker/intex";
import { TimePickers } from "../../../TimePicker/intex";
import { ReactSelect } from "../../../../../../../components/ReactSelect/intex";

import { useAddProgram } from "../../store/addProgram";
import {
  dateWarning,
  descriptionWarning,
  judgesWarning,
  participantWarning,
  programDuplicate,
  programWarning,
  timeWarning,
} from "../../Utils/warnings";
import { ProgramType } from "../../Types/intex";

type AddNewProgramType = {
  isOpen: boolean;
  handleClose: () => void;
  event: string;
};

export default function AddNewProgram({
  isOpen,
  handleClose,
  event,
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
  const showWarning = useAddProgram(
    useCallback((state) => state.showWarning, [])
  );

  const warningType = showWarning(programValues, "programname");

  function onCreateNewProgram() {
    let existingProgram = JSON.parse(
      localStorage.getItem("programDetails") || "[]"
    );
    let programArray = Array.isArray(existingProgram) ? existingProgram : [];

    let newProgram = { ...programValues, eventName: event };

    programArray.push(newProgram);
    localStorage.setItem("programDetails", JSON.stringify(programArray));
    localStorage.removeItem("editProgram");
    handleClose();
    clearProgramValues();
  }

  const participantOptions = [
    { value: "Ramu", label: "Ramu" },
    { value: "Latha", label: "Latha" },
    { value: "Deepthi", label: "Deepthi" },
    { value: "Neeli", label: "Neeli" },
    { value: "Thira", label: "Thira" },
    { value: "Hari", label: "Hari" },
    { value: "Jaasi", label: "Jaasi" },
  ];

  function checkDisable() {
    return (
      (!programValues?.programname?.trim() &&
        !filteredEdit?.programname?.trim()) ||
      (!programValues?.description?.trim() &&
        !filteredEdit?.description?.trim()) ||
      (!programValues?.startDate && !filteredEdit?.startDate) ||
      (!programValues?.time && !filteredEdit?.time) ||
      (!programValues?.judges && !filteredEdit?.judges) ||
      (!programValues?.participant && !filteredEdit?.participant) ||
      !!showWarning(programValues, "programname") ||
      !!showWarning(programValues, "description") ||
      !!showWarning(programValues, "startDate") ||
      !!showWarning(programValues, "time") ||
      !!showWarning(programValues, "judges") ||
      !!showWarning(programValues, "participant")
    );
  }

  function onCancel() {
    clearProgramValues();
    handleClose();
  }

  let editProgram = JSON.parse(localStorage.getItem("editProgram") || "null");
  let programsList = JSON.parse(localStorage.getItem("programDetails") || "[]");
  const filteredEdit = programsList.find(
    (item: ProgramType) => item?.programname === editProgram?.programname
  );

  function onEditProgram() {
    const updatedProgram = { ...filteredEdit, ...programValues };
    const newEventArray = programsList.map((program: ProgramType) =>
      program?.programname === filteredEdit?.programname
        ? updatedProgram
        : program
    );
    localStorage.setItem("programDetails", JSON.stringify(newEventArray));
    localStorage.removeItem("editProgram");
    handleClose();
  }
  const judgesList = JSON.parse(localStorage.getItem("judgesList") || "[]");
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
                {editProgram ? "Edit Program" : "Add New Program"}
              </DialogTitle>
              <hr />
              <div className="flex flex-col gap-7 p-6">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="programname">Program Name</label>
                    <input
                      type="text"
                      id="programname"
                      className={`w-64 border-2 h-8 border-gray-300 rounded pl-2 ${
                        filteredEdit ? "text-gray-400" : "text-gray-700"
                      }`}
                      value={
                        programValues?.programname ??
                        filteredEdit?.programname ??
                        ""
                      }
                      disabled={filteredEdit}
                      onChange={(e) =>
                        setProgramValues("programname", e.target.value)
                      }
                    />
                    {warningType === "empty" && (
                      <p className="text-red-500 text-sm">{programWarning}</p>
                    )}
                    {warningType === "duplicate" && (
                      <p className="text-red-500 text-sm">{programDuplicate}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="date">Date</label>
                    <Datepickers
                      fieldValues={programValues}
                      setFieldValues={setProgramValues}
                      filteredEvent={filteredEdit}
                    />
                    {showWarning(programValues, "startDate") && (
                      <p className="text-red-500 text-sm">{dateWarning}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      id="description"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={
                        programValues?.description ??
                        filteredEdit?.description ??
                        ""
                      }
                      onChange={(e) =>
                        setProgramValues("description", e.target.value)
                      }
                    />
                    {showWarning(programValues, "description") && (
                      <p className="text-red-500 text-sm">
                        {descriptionWarning}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="time">Time</label>
                    <TimePickers
                      fieldValues={programValues}
                      setFieldValues={setProgramValues}
                      filteredEvent={filteredEdit}
                    />
                    {showWarning(programValues, "time") && (
                      <p className="text-red-500 text-sm">{timeWarning}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="judges">Judges names</label>
                  <ReactSelect
                    options={judgesList}
                    id="judges"
                    setSelectedOptions={(e) => {
                      setProgramValues("judges", e);
                      setProgramValues("touchedFields", {
                        ...programValues?.touchedFields,
                        judges: true,
                      });
                    }}
                    value={programValues?.judges ?? filteredEdit?.judges ?? []}
                    isSearchable={true}
                    menuPlacement="top"
                    noDataMessage={
                      judgesList.length === 0
                        ? "You does not add judges in the judgesList"
                        : ""
                    }
                  />
                  {showWarning(programValues, "judges") && (
                    <p className="text-red-500 text-sm">{judgesWarning}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="participant">Participant names</label>
                  <ReactSelect
                    options={participantOptions}
                    id="participant"
                    setSelectedOptions={(e) => {
                      setProgramValues("participant", e);
                      setProgramValues("touchedFields", {
                        ...programValues?.touchedFields,
                        participant: true,
                      });
                    }}
                    value={
                      programValues?.participant ??
                      filteredEdit?.participant ??
                      []
                    }
                    isSearchable={true}
                    menuPlacement="top"
                    noDataMessage={
                      participantOptions.length === 0
                        ? "You does not add participant in the participantList"
                        : ""
                    }
                  />
                  {showWarning(programValues, "participant") && (
                    <p className="text-red-500 text-sm">{participantWarning}</p>
                  )}
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
                      : "bg-indigo-600 text-white hover:bg-indigo-500"
                  }`}
                  disabled={checkDisable()}
                  onClick={editProgram ? onEditProgram : onCreateNewProgram}
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
