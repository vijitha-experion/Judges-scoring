import { ReactElement, useCallback } from "react";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import {
  phoneDuplicate,
  phoneWarning,
  nameWarning,
  addressWarning,
  positionWarning,
} from "../../Utils/warning";
import { useJudges } from "../../Store/judgesStore";
import { JudgesType } from "../../Types/judgesType";

type AddEventType = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function AddJudge({
  isOpen,
  handleClose,
}: AddEventType): ReactElement {
  const JudgesValue = useJudges(useCallback((state) => state.JudgesValue, []));
  const setJudgesValue = useJudges(
    useCallback((state) => state.setJudgesValue, [])
  );
  const clearJudgesValue = useJudges(
    useCallback((state) => state.clearJudgesValue, [])
  );

  const showWarning = useJudges(useCallback((state) => state.showWarning, []));
  const warningType = showWarning(JudgesValue, "phone");

  function addNewJudge() {
    let existingJudges = JSON.parse(
      localStorage.getItem("judgesDetails") || "[]"
    );
    let JudgesArray = Array.isArray(existingJudges) ? existingJudges : [];
    JudgesArray.push(JudgesValue);
    localStorage.setItem("judgesDetails", JSON.stringify(JudgesArray));
    const newData = JudgesArray.map((judge: JudgesType) => ({
      value: judge.phone,
      label: judge.judge,
    }));
    localStorage.setItem("judgesList", JSON.stringify(newData));
    handleClose();
    clearJudgesValue();
  }

  function checkDisable() {
    return (
      (!JudgesValue?.judge?.trim() && !filteredJudge?.judge?.trim()) ||
      (!JudgesValue?.phone && !filteredJudge?.phone) ||
      (!JudgesValue?.address?.trim() && !filteredJudge?.address?.trim()) ||
      (!JudgesValue?.position?.trim() && !filteredJudge?.position?.trim()) ||
      showWarning(JudgesValue, "judge") ||
      showWarning(JudgesValue, "phone") ||
      showWarning(JudgesValue, "address") ||
      showWarning(JudgesValue, "position")
    );
  }

  function onCancel() {
    handleClose();
    clearJudgesValue();
  }

  const editingJudge = JSON.parse(localStorage.getItem("editJudge") || "null");
  const existingJudges = JSON.parse(
    localStorage.getItem("judgesDetails") || "[]"
  );
  const filteredJudge = existingJudges.find(
    (item: JudgesType) => item?.phone === editingJudge?.phone
  );

  function onEditJugde() {
    const updatedJudge = { ...filteredJudge, ...JudgesValue };
    const newJudgeArray = existingJudges.map((judge: JudgesType) =>
      judge?.phone === filteredJudge?.phone ? updatedJudge : judge
    );
    localStorage.setItem("judgesDetails", JSON.stringify(newJudgeArray));
    localStorage.removeItem("editJudge");
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
                {editingJudge ? "Edit Judge" : "Add Judge"}
              </DialogTitle>
              <hr />
              <div className="flex flex-col gap-7 p-6">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="judge">Judge Name</label>
                    <input
                      type="text"
                      id="judge"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={JudgesValue?.judge ?? filteredJudge?.judge ?? ""}
                      onChange={(e) => {
                        setJudgesValue("judge", e.target.value);
                      }}
                    />
                    {showWarning(JudgesValue, "judge") && (
                      <p className="text-red-500 text-sm">{nameWarning}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      className={`w-64 border-2 h-8 border-gray-300 rounded pl-2 
                        ${editingJudge ? "text-gray-400" : "text-gray-700"} `}
                      value={JudgesValue?.phone ?? filteredJudge?.phone ?? ""}
                      onChange={(e) => setJudgesValue("phone", e.target.value)}
                      disabled={filteredJudge}
                    />
                    {warningType === "empty" && (
                      <p className="text-red-500 text-sm">{phoneWarning}</p>
                    )}
                    {warningType === "duplicate" && (
                      <p className="text-red-500 text-sm">{phoneDuplicate}</p>
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
                        JudgesValue?.address ?? filteredJudge?.address ?? ""
                      }
                      onChange={(e) =>
                        setJudgesValue("address", e.target.value)
                      }
                    />
                    {showWarning(JudgesValue, "address") && (
                      <p className="text-red-500 text-sm">{addressWarning}</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="position">Position</label>
                    <input
                      type="text"
                      className="w-64 border-2 h-8 border-gray-300 rounded pl-2 text-gray-700"
                      value={
                        JudgesValue?.position ?? filteredJudge?.position ?? ""
                      }
                      onChange={(e) =>
                        setJudgesValue("position", e.target.value)
                      }
                    />
                    {showWarning(JudgesValue, "position") && (
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
                  onClick={editingJudge ? onEditJugde : addNewJudge}
                >
                  {editingJudge ? "Update" : "Add"}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
