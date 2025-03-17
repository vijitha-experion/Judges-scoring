import { create } from "zustand";
import { produce } from "immer";
import { ProgramType } from "../Types/programType";

export const useAddProgram = create<any>()((set, get) => ({
  programValues: {},
  touchedFields: {},
  setProgramValues: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.programValues = { ...get().programValues, [key]: value };
        state.touchedFields[key] = true;
      })
    );
  },
  clearProgramValues() {
    set(
      produce((state: any) => {
        state.programValues = {};
        state.touchedFields = {};
      })
    );
  },
  showWarning(program: ProgramType, field: string): string | boolean {
    const { touchedFields } = get();
    if (!touchedFields[field]) return false;

    if (field === "programName") {
      const event = JSON.parse(localStorage.getItem("event") || "");
      if (!program?.programName?.trim()) return "empty";

      let existingPrograms: ProgramType[] = JSON.parse(
        localStorage.getItem("programDetails") || "[]"
      );
      const isDuplicate = existingPrograms.some(
        (e) =>
          e.programName?.toLowerCase() ===
            program.programName?.trim()?.toLowerCase() &&
          e.eventName?.toLowerCase() === event?.trim()?.toLowerCase()
      );
      if (isDuplicate) return "duplicate";
    }

    if (field === "description") return !program?.description?.trim();
    if (field === "startDate") return !program?.startDate;
    if (field === "time") return !program?.time;
    if (field === "judges")
      return !program?.judges || program?.judges.length === 0;
    if (field === "participant")
      return !program?.participant || program?.participant.length === 0;

    return false;
  },
}));
