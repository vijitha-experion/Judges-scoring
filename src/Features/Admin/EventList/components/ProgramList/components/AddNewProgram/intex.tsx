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
  event: any;
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

  const warningType = showWarning(programValues, "programName");

  if (event) {
    localStorage.setItem("event", JSON.stringify(event.eventName));
  } else {
    console.error("event is null or undefined");
  }

  function onCreateNewProgram() {
    const existingProgram = JSON.parse(
      localStorage.getItem("programDetails") || "[]"
    );
    const programArray = Array.isArray(existingProgram) ? existingProgram : [];
    const unique = programValues?.judges?.map(
      (j: any) =>
        `CODE-${programValues?.programName}-${event?.eventName}-${j.label}`
    );
    const newProgram = {
      ...programValues,
      eventName: event.eventName,
      uniqueCode: unique,
    };
    programArray.push(newProgram);
    localStorage.setItem("programDetails", JSON.stringify(programArray));
    localStorage.removeItem("editProgram");
    handleClose();
    clearProgramValues();
  }

  function checkDisable() {
    return (
      (!programValues?.programName?.trim() &&
        !filteredEdit?.programName?.trim()) ||
      (!programValues?.description?.trim() &&
        !filteredEdit?.description?.trim()) ||
      (!programValues?.startDate && !filteredEdit?.startDate) ||
      (!programValues?.time && !filteredEdit?.time) ||
      (!programValues?.judges && !filteredEdit?.judges) ||
      (!programValues?.participant && !filteredEdit?.participant) ||
      !!showWarning(programValues, "programName") ||
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

  const editProgram = JSON.parse(localStorage.getItem("editProgram") || "null");
  const programsList = JSON.parse(
    localStorage.getItem("programDetails") || "[]"
  );
  const filteredEdit = programsList.find(
    (item: ProgramType) => item?.programName === editProgram?.programName
  );

  function onEditProgram() {
    const unique = programValues?.judges?.map(
      (j: any) =>
        `CODE-${programValues?.programName}-${event?.eventName}-${j.label}`
    );
    const updatedProgram = {
      ...filteredEdit,
      ...programValues,
      uniqueCode: unique,
    };
    const newEventArray = programsList.map((program: ProgramType) =>
      program?.programName === filteredEdit?.programName
        ? updatedProgram
        : program
    );
    console.log(newEventArray, "newEventArray");
    localStorage.setItem("programDetails", JSON.stringify(newEventArray));
    localStorage.removeItem("editProgram");
    handleClose();
  }
  const judgesList = JSON.parse(localStorage.getItem("judgesList") || "[]");
  const participantList = JSON.parse(
    localStorage.getItem("participantList") || "[]"
  );

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
                    <label htmlFor="programName">Program Name</label>
                    <input
                      type="text"
                      id="programName"
                      className={`w-64 border-2 h-8 border-gray-300 rounded pl-2 ${
                        filteredEdit ? "text-gray-400" : "text-gray-700"
                      }`}
                      value={
                        programValues?.programName ??
                        filteredEdit?.programName ??
                        ""
                      }
                      disabled={filteredEdit}
                      onChange={(e) =>
                        setProgramValues("programName", e.target.value)
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
                      event={event}
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
                    options={participantList}
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
                      "You does not add participant in the participantList"
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
