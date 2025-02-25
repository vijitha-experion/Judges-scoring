import { create } from "zustand";
import { produce } from "immer";

export const useAddNewEvent = create<any>()((set, get) => ({
  fieldValues: {},
  setFieldValues: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.fieldValues = { ...get().fieldValues, [key]: value };
      })
    );
  },
  clearFieldValues() {
    set(
      produce((state: any) => {
        state.fieldValues = undefined;
      })
    );
  },
}));
