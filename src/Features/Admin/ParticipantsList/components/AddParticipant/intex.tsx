import { ReactElement, useCallback } from "react";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import {
  phoneDuplicate,
  phoneWarning,
  nameWarning,
  addressWarning,
  positionWarning,
  incorrectPattern,
} from "../../Utils/warning";
import { useParticipant } from "../../Store/participantStore";
import { ParticipantType } from "../../Types/participantType";

type AddParticipantType = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function AddParticipant({
  isOpen,
  handleClose,
}: AddParticipantType): ReactElement {
  const participantValue = useParticipant(
    useCallback((state) => state.participantValue, [])
  );
  const setParticipantValue = useParticipant(
    useCallback((state) => state.setParticipantValue, [])
  );
  const clearParticipantValue = useParticipant(
    useCallback((state) => state.clearParticipantValue, [])
  );

  const showWarning = useParticipant(
    useCallback((state) => state.showWarning, [])
  );
  const warningType = showWarning(participantValue, "phone");

  function addParticipant() {
    let existingParticipant = JSON.parse(
      localStorage.getItem("ParticipantDetails") || "[]"
    );
    let participantArray = Array.isArray(existingParticipant)
      ? existingParticipant
      : [];
    participantArray.push(participantValue);
    localStorage.setItem(
      "ParticipantDetails",
      JSON.stringify(participantArray)
    );
    const newData = participantArray.map((participant: ParticipantType, index: number) => ({
      value: participant.phone,
      label: `${participant.participant}-(ParticipantID-${index + 1})`,
    }));
    localStorage.setItem("participantList", JSON.stringify(newData));
    handleClose();
    clearParticipantValue();
  }

  function checkDisable() {
    return (
      (!participantValue?.participant?.trim() &&
        !filteredParticipant?.participant?.trim()) ||
      (!participantValue?.phone && !filteredParticipant?.phone) ||
      (!participantValue?.address?.trim() &&
        !filteredParticipant?.address?.trim()) ||
      (!participantValue?.position?.trim() &&
        !filteredParticipant?.position?.trim()) ||
      showWarning(participantValue, "participant") ||
      showWarning(participantValue, "phone") ||
      showWarning(participantValue, "address") ||
      showWarning(participantValue, "position")
    );
  }

  function onCancel() {
    handleClose();
    clearParticipantValue();
  }

  const editingParticipant = JSON.parse(
    localStorage.getItem("editParticipant") || "null"
  );
  const existingParticipant = JSON.parse(
    localStorage.getItem("ParticipantDetails") || "[]"
  );
  const filteredParticipant = existingParticipant.find(
    (item: ParticipantType) => item?.phone === editingParticipant?.phone
  );

  function onEditParticipant() {
    const updatedParticipant = { ...filteredParticipant, ...participantValue };
    const newParticipantArray = existingParticipant.map(
      (participant: ParticipantType) =>
        participant?.phone === filteredParticipant?.phone
          ? updatedParticipant
          : participant
    );
    localStorage.setItem(
      "ParticipantDetails",
      JSON.stringify(newParticipantArray)
    );
    localStorage.removeItem("editParticipant");
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
              className="w-full max-w-xl rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-lg font-semibold p-6 pb-3">
                {editingParticipant ? "Edit Participant" : "Add Participant"}
              </DialogTitle>
              <hr />
              <div className="flex flex-col gap-7 p-6">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="participant">Participant Name</label>
                    <input
                      type="text"
                      id="participant"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={
                        participantValue?.participant ??
                        filteredParticipant?.participant ??
                        ""
                      }
                      onChange={(e) => {
                        setParticipantValue("participant", e.target.value);
                      }}
                    />
                    {showWarning(participantValue, "participant") && (
                      <p className="text-red-500 text-sm">{nameWarning}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      className={`w-64 border-2 h-8 border-gray-300 rounded pl-2 
                        ${
                          editingParticipant ? "text-gray-400" : "text-gray-700"
                        } `}
                      value={
                        participantValue?.phone ??
                        filteredParticipant?.phone ??
                        ""
                      }
                      onChange={(e) =>
                        setParticipantValue("phone", e.target.value)
                      }
                      disabled={filteredParticipant}
                    />
                    {warningType === "empty" && (
                      <p className="text-red-500 text-sm">{phoneWarning}</p>
                    )}
                    {warningType === "duplicate" && (
                      <p className="text-red-500 text-sm">{phoneDuplicate}</p>
                    )}
                    {warningType === "pattern" && (
                      <p className="text-red-500 text-sm">{incorrectPattern}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={
                        participantValue?.address ??
                        filteredParticipant?.address ??
                        ""
                      }
                      onChange={(e) =>
                        setParticipantValue("address", e.target.value)
                      }
                    />
                    {showWarning(participantValue, "address") && (
                      <p className="text-red-500 text-sm">{addressWarning}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="position">Position</label>
                    <input
                      type="text"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={
                        participantValue?.position ??
                        filteredParticipant?.position ??
                        ""
                      }
                      onChange={(e) =>
                        setParticipantValue("position", e.target.value)
                      }
                    />
                    {showWarning(participantValue, "position") && (
                      <p className="text-red-500 text-sm">{positionWarning}</p>
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
                  onClick={
                    editingParticipant ? onEditParticipant : addParticipant
                  }
                >
                  {editingParticipant ? "Update" : "Add"}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
