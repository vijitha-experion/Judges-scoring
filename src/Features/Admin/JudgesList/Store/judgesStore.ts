import { create } from "zustand";
import { produce } from "immer";

import { JudgesType } from "../Types/judgesType";

export const useJudges = create<any>()((set, get) => ({
  JudgesValue: {},
  touchedFields: {},
  setJudgesValue: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.JudgesValue = { ...get().JudgesValue, [key]: value };
        state.touchedFields[key] = true;
      })
    );
  },
  clearJudgesValue() {
    set(
      produce((state: any) => {
        localStorage.removeItem("editJudge");
        state.JudgesValue = {};
        state.touchedFields = {};
      })
    );
  },
  showWarning(Judge: JudgesType, field: string): string | boolean {
    const { touchedFields } = get();
    if (!touchedFields[field]) return false;

    if (field === "eventname") {
      if (!Judge?.phone) return "empty";

      let existingEvents: JudgesType[] = JSON.parse(
        localStorage.getItem("judgeDetails") || "[]"
      );
      const isDuplicate = existingEvents.some((e) => e?.phone === Judge?.phone);
      if (isDuplicate) return "duplicate";
    }

    if (field === "judge") return !Judge?.judge?.trim() ? true : false;
    if (field === "address") return !Judge?.address ? true : false;
    if (field === "position") return !Judge?.position ? true : false;

    return false;
  },
}));
