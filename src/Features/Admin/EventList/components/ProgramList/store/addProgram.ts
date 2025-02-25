import { create } from "zustand";
import { produce } from "immer";

export const useAddProgram = create<any>()((set, get) => ({
  programValues: {},
  setProgramValues: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.programValues = { ...get().programValues, [key]: value };
      })
    );
  },
  clearProgramValues() {
    set(
      produce((state: any) => {
        state.programValues = undefined;
      })
    );
  },
}));
