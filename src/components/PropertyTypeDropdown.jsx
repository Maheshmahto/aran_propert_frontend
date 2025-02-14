import React, { useEffect, useState } from "react";
import CommercialPropertyModal from "./CommercialPropertyModal";
import axios from "../helper/axios";

const PropertyTypeDropdown = ({ onChange }) => {
  const [selectedType, setSelectedType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ProCategories, setProCategories] = useState([]);

  const ProTypes = async () => {
    try {
      const response = await axios.get('/api/property_types/');
      console.log("API Response:", response.data);
      setProCategories(response.data);
    } catch (error) {
      console.error("Error fetching property types:", error);
    }
  };

  const [id, setId] = useState('');

  useEffect(() => {
    ProTypes();
  }, []);

  useEffect(() => {
    console.log("Updated Property Categories:", ProCategories);
  }, [ProCategories]);

  // const handleTypeSelect = (type) => {
  //   console.log(type.type_id);
  //   setId(type.type_id);
  //   setSelectedType(type.category);
  //   setShowDropdown(false);

  //   // Pass the selected value to the parent component
  //   onChange({ target: { name: "property_type", value: type.category } });

  //   if (type.category === "Commercial") {
  //     setIsModalOpen(true);
  //   }
  // };
  const handleTypeSelect = (type) => {
    console.log(type.type_id);
    setId(type.type_id);
    setSelectedType(type.category);
    setShowDropdown(false);
  
    // Pass the selected value and type_id to the parent component
    onChange({ 
      target: { 
        name: "property_type", 
        value: type.category,
        type_id: type.type_id // Include type_id in the event object
      } 
    });
  
    if (type.category === "Commercial") {
      setIsModalOpen(true);
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
          className="w-full mt-4 p-3 border rounded-lg shadow-sm cursor-pointer"
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
          {ProCategories.map((item) => (
            <div
              key={item.id}
              className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => handleTypeSelect(item)}
            >
              {item.category}
            </div>
          ))}
        </div>
      )}
      <CommercialPropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={id}
      />
    </div>
  );
};

export default PropertyTypeDropdown;