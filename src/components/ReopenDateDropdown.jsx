import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReopenDateDropdown = () => {
  const [selectedOption, setSelectedOption] = useState(" ");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const reopenOptions = [
    "Available",
    "Leased Out (dd/mm/yyyy)",
    "Reopen Date (dd/mm/yyyy)",
    "Sold out",
  ];

  return (
    <div className="relative w-full">
      <label className="block font-medium">Reopen Date</label>

      {/* Input box for dropdown selection */}
      <div onClick={() => setShowDropdown(!showDropdown)} className="flex relative">
        <input
          type="text"
          value={selectedOption}
          readOnly
          className="w-full mt-4 p-3 border rounded-lg shadow-sm  cursor-pointer"
        />
        <img
          className={`object-none absolute bottom-3 p-3 right-3 ${
            showDropdown && "rotate-180"
          } `}
          src="/LeftColumn/Closed.png"
          alt=""
        />
      </div>

      {/* Dropdown Options */}
      {showDropdown && (
        <div className="absolute w-full bg-white border shadow-lg rounded-lg mt-1 z-10">
          {reopenOptions.map((option) => (
            <div
              key={option}
              className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => {
                setSelectedOption(option);
                setShowDropdown(false);
                if (option.includes("dd/mm/yyyy")) {
                  setSelectedDate(new Date()); // Set current date initially
                } else {
                  setSelectedDate(null); // Reset date if not needed
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {/* Show DatePicker if selected option requires a date */}
      {(selectedOption === "Leased Out (dd/mm/yyyy)" ||
        selectedOption === "Reopen Date (dd/mm/yyyy)") && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="w-full mt-2 p-3 border rounded-lg shadow-sm "
          placeholderText="Select Date"
        />
      )}
    </div>
  );
};

export default ReopenDateDropdown;
