import { create } from "zustand";
import { produce } from "immer";

import { JudgesType } from "../Types/judgesType";
import { phonePattern } from "../Utils/warning";

export const useJudges = create<any>()((set, get) => ({
  judgesValue: {},
  touchedFields: {},
  setJudgesValue: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.judgesValue = { ...get().judgesValue, [key]: value };
        state.touchedFields[key] = true;
      })
    );
  },
  clearJudgesValue() {
    set(
      produce((state: any) => {
        localStorage.removeItem("editJudge");
        state.judgesValue = {};
        state.touchedFields = {};
      })
    );
  },
  showWarning(judge: JudgesType, field: string): string | boolean {
    const { touchedFields } = get();
    if (!touchedFields[field]) return false;

    if (field === "phone") {  
      if (!judge?.phone) return "empty";

      let existingJudges: JudgesType[] = JSON.parse(
        localStorage.getItem("judgeDetails") || "[]"
      );
      const isDuplicate = existingJudges.some((e) => e?.phone === judge?.phone);
      if (isDuplicate) return "duplicate";
      if (!phonePattern.test(judge?.phone?.toString())) {
        return "pattern";
      }
    }

    if (field === "judge") return !judge?.judge?.trim() ? true : false;
    if (field === "address") return !judge?.address ? true : false;
    if (field === "position") return !judge?.position ? true : false;

    return false;
  },
}));
