import { useState, useRef, useEffect } from "react";
// import { DateRange, RangeKeyDict } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

export default function HypeserverDatepicker() {
  // const [showCalendar, setShowCalendar] = useState(false);
  // const [dateRange, setDateRange] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   key: "selection",
  // });

  // const calendarRef = useRef<HTMLDivElement>(null);

  // // Handle date selection
  // function handleSelect(ranges: RangeKeyDict) {
  //   const selectedRange = ranges.selection;

  //   // Update the state with the selected range
  //   setDateRange({
  //     startDate: selectedRange.startDate!,
  //     endDate: selectedRange.endDate!,
  //     key: "selection",
  //   });
  // }

  // // Close calendar when clicking outside
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (
  //       calendarRef.current &&
  //       !calendarRef.current.contains(event.target as Node)
  //     ) {
  //       setShowCalendar(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // // Format date for input field
  // function formatDate(date: Date) {
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });
  // }

  return (
    <div></div>
    // <div className="relative" ref={calendarRef}>
    //   {/* Input field to show selected date */}
    //   <input
    //     type="text"
    //     readOnly
    //     value={`${formatDate(dateRange.startDate)} - ${formatDate(
    //       dateRange.endDate
    //     )}`}
    //     onClick={() => setShowCalendar(true)}
    //     className="border p-2 rounded-full cursor-pointer w-64 shadow-md focus:ring-2 focus:ring-blue-500"
    //   />

    //   {/* Calendar (shown only when input is clicked) */}
    //   {showCalendar && (
    //     <div className="absolute z-10 bg-white shadow-lg mt-2">
    //       <DateRange
    //         editableDateInputs={true}
    //         onChange={handleSelect}
    //         moveRangeOnFirstSelection={false} // Prevents closing after selecting the first date
    //         ranges={[dateRange]}
    //         onRangeFocusChange={(focusedRange) => {
    //           if (focusedRange[0] === undefined) {
    //             setShowCalendar(false); // Close only when both dates are selected
    //           }
    //         }}
    //       />
    //     </div>
    //   )}
    // </div>
  );
}
