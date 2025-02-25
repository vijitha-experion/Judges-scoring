import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const Datepickers = ({ setFieldValues, fieldValues }: any) => {
  const handleChange = (newValue: DateValueType) => {
    if (newValue) {
      setFieldValues(
        "startDate",
        newValue.startDate
          ? new Date(newValue.startDate).toISOString().split("T")[0]
          : null
      );
      setFieldValues(
        "endDate",
        newValue.endDate
          ? new Date(newValue.endDate).toISOString().split("T")[0]
          : null
      );
    }
  };

  return (
    <Datepicker
      value={{
        startDate: fieldValues?.startDate || null,
        endDate: fieldValues?.endDate || null,
      }}
      onChange={handleChange}
      inputClassName="w-48 pl-2 h-8 border-2 border-gray-300 rounded pr-9 text-gray-700"
      toggleClassName="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
    />
  );
};

export default Datepickers;
