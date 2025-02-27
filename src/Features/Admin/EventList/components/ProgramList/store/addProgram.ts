import { create } from "zustand";
import { produce } from "immer";
import { ProgramType } from "../Types/intex";

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

    if (field === "programname") {
      if (!program?.programname?.trim()) return "empty";

      let existingPrograms: ProgramType[] = JSON.parse(
        localStorage.getItem("programDetails") || "[]"
      );
      const isDuplicate = existingPrograms.some(
        (e) =>
          e.programname?.toLowerCase() ===
          program.programname?.trim()?.toLowerCase()
      );
      if (isDuplicate) return "duplicate";
    }

    if (field === "description")
      return !program?.description?.trim() ? true : false;
    if (field === "startDate") return !program?.startDate ? true : false;
    if (field === "time") return !program?.time ? true : false;
    if (field === "judges") return !program?.judges;

    return false;
  },
}));
