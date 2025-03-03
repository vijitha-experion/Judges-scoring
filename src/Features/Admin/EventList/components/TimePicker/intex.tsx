import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

export function TimePickers({
  fieldValues,
  setFieldValues,
  filteredEvent,
}: any) {
  function handleTimeChange(value: string | null) {
    setFieldValues("time", value ?? "");
  }

  return (
    <TimePicker
      value={fieldValues?.time ?? filteredEvent?.time ?? ""}
      onChange={handleTimeChange}
      disableClock={true}
      className="w-48"
    />
  );
}
