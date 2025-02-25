import { create } from "zustand";
import { produce } from "immer";

export const useEvaluationPoint = create<any>()((set, get) => ({
  evaluationValues: {},
  setEvaluationValues: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.evaluationValues = { ...get().evaluationValues, [key]: value };
      })
    );
  },
  clearEvaluationValues() {
    set(
      produce((state: any) => {
        state.evaluationValues = undefined;
      })
    );
  },
}));
