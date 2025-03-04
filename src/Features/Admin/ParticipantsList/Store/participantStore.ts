import { create } from "zustand";
import { produce } from "immer";
import { ParticipantType } from "../Types/participantType";
import { phonePattern } from "../Utils/warning";

export const useParticipant = create<any>()((set, get) => ({
  participantValue: {},
  touchedFields: {},
  setParticipantValue: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.participantValue = { ...get().participantValue, [key]: value };
        state.touchedFields[key] = true;
      })
    );
  },
  clearParticipantValue() {
    set(
      produce((state: any) => {
        localStorage.removeItem("editParticipant");
        state.participantValue = {};
        state.touchedFields = {};
      })
    );
  },
  showWarning(participant: ParticipantType, field: string): string | boolean {
    const { touchedFields } = get();
    if (!touchedFields[field]) return false;

    if (field === "phone") {
      if (!participant?.phone) return "empty";

      let existingParticipant: ParticipantType[] = JSON.parse(
        localStorage.getItem("ParticipantDetails") || "[]"
      );
      const isDuplicate = existingParticipant.some(
        (e) => e?.phone === participant?.phone
      );
      if (isDuplicate) return "duplicate";
      if (!phonePattern.test(participant?.phone?.toString())) {
        return "pattern";
      }
    }

    if (field === "participant")
      return !participant?.participant?.trim() ? true : false;
    if (field === "address") return !participant?.address ? true : false;
    if (field === "position") return !participant?.position ? true : false;

    return false;
  },
}));
