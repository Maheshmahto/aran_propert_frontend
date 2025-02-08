import React, { useState } from "react";
import CommercialPropertyModal from "./CommercialPropertyModal";

const PropertyTypeDropdown = () => {
  const [selectedType, setSelectedType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const propertyTypes = [
    "Commercial",
    "Office Space",
    "Industrial Building",
    "Gowdown/Warehouse",
    "Showroom",
    "Other Business",
  ];

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowDropdown(false);

    if (type === "Commercial") {
      setIsModalOpen(true); // Open the modal for Commercial
    }
  };

  return (
    <div className="relative w-full">
      <label className="block font-medium">Property Type</label>
      <div onClick={() => setShowDropdown(!showDropdown)} className="flex relative">
        <input
          type="text"
          value={selectedType}
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
      {showDropdown && (
        <div className="absolute w-full bg-white border shadow-lg rounded-lg mt-1 z-10">
          {propertyTypes.map((type) => (
            <div
              key={type}
              className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => handleTypeSelect(type)}
            >
              {type}
            </div>
          ))}
        </div>
      )}
      <CommercialPropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PropertyTypeDropdown;