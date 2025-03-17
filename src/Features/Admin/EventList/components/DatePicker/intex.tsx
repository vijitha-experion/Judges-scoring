import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const Datepickers = ({
  fieldValues,
  setFieldValues,
  filteredEvent,
  event,
}: any) => {
  const handleChange = (newValue: DateValueType | null) => {
    if (newValue) {
      setFieldValues("touchedFields", {
        ...fieldValues?.touchedFields,
        startDate: true,
      });
      setFieldValues(
        "startDate",
        newValue.startDate
          ? new Date(newValue.startDate).toLocaleDateString("en-GB")
          : ""
      );
      setFieldValues(
        "endDate",
        newValue.endDate
          ? new Date(newValue.endDate).toLocaleDateString("en-GB")
          : ""
      );
    }
  };

  return (
    <Datepicker
      value={{
        startDate: fieldValues?.startDate ?? filteredEvent?.startDate ?? null,
        endDate: fieldValues?.endDate ?? filteredEvent?.endDate ?? null,
      }}
      minDate={event?.startDate ? new Date(event.startDate) : new Date()}
      maxDate={event?.endDate ? new Date(event.endDate) : null}
      onChange={handleChange}
      inputClassName="w-48 pl-2 h-8 border-2 border-gray-300 rounded pr-9 text-gray-700"
      toggleClassName="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
    />
  );
};

export default Datepickers;
