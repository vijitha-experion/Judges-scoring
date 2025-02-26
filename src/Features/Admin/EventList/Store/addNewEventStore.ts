import { create } from "zustand";
import { produce } from "immer";

import { EventType } from "../Types/table";

export const useAddNewEvent = create<any>()((set, get) => ({
  eventValue: {},
  touchedFields: {},
  setEventValue: (key: string, value: any) => {
    set(
      produce((state: any) => {
        state.eventValue = { ...get().eventValue, [key]: value };
        state.touchedFields[key] = true; 
      })
    );
  },
  clearEventValue() {
    set(
      produce((state: any) => {
        state.eventValue = {};
        state.touchedFields = {};
      })
    );
  },
  showWarning(event: EventType, field: string): string | boolean {
    const { touchedFields } = get();
    if (!touchedFields[field]) return false;

    if (field === "eventname") {
      if (!event?.eventname?.trim()) return "empty";

      let existingEvents: EventType[] = JSON.parse(
        localStorage.getItem("eventDetails") || "[]"
      );
      const isDuplicate = existingEvents.some(
        (e) =>
          e.eventname?.toLowerCase() === event.eventname?.trim()?.toLowerCase()
      );
      if (isDuplicate) return "duplicate";
    }

    if (field === "venue") return !event?.venue?.trim() ? true : false;
    if (field === "startDate") return !event?.startDate ? true : false;
    if (field === "time") return !event?.time ? true : false;

    return false;
  },
}));
