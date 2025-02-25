import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

export function TimePickers({ fieldValues, setFieldValues }: any) {
  return (
    <TimePicker
      value={fieldValues?.time} 
      onChange={(value) => setFieldValues("time", value)} 
      disableClock={true}
      className="w-48"
    />
  );
}
