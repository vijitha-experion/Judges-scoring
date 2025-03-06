import { create } from "zustand";
import { produce } from "immer";

import { JoinRoom } from "../Types/joinRoom";

export const useJoinRoom = create<any>()((set, get) => ({
  joinValue: {},
  touchedFields: {},
  setJoinValue: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.joinValue = { ...get().joinValue, [key]: value };
        state.touchedFields[key] = true;
      })
    );
  },
  clearJoinValue() {
    set(
      produce((state: any) => {
        state.joinValue = {};
        state.touchedFields = {};
      })
    );
  },
  showWarning(room: JoinRoom, field: string): string | boolean {
    const { touchedFields } = get();
    if (!touchedFields[field]) return false;
    if (field === "roomName") return !room?.roomName?.trim() ? true : false;
    if (field === "password") return !room?.password?.trim() ? true : false;

    return false;
  },
}));
