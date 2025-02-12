import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";
import { useLogin } from "../../hooks/LoginContext";

const UserSidebar = ({ properties = [], setFilteredPropertiesSidebar }) => {
  const MIN_PRICE = 100;
  const MAX_PRICE = 10000;
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [anyPrice, setAnyPrice] = useState(false);
  const { logout } = useLogin();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  const handleLogOut = () => {
    logout();
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCheckboxChange = (propertyType) => {
    setSelectedPropertyTypes(
      (prev) =>
        prev.includes(propertyType)
          ? prev.filter((type) => type !== propertyType) // Remove if already selected
          : [...prev, propertyType] // Add if not selected
    );
  };

  useEffect(() => {
    // Apply filtering based on selected property types
    if (selectedPropertyTypes.length === 0) {
      setFilteredPropertiesSidebar(properties); // Show all if nothing is selected
    } else {
      const filtered = properties.filter((property) =>
        selectedPropertyTypes.includes(property.property_type)
      );
      setFilteredPropertiesSidebar(filtered);
    }
  }, [selectedPropertyTypes, properties]);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        weekday: "short", // Mon
        day: "2-digit", // 10
        month: "short", // Feb
        year: "numeric", // 2025
      }).format(now);

      setCurrentDate(formattedDate);
    };

    updateDate(); // Set initial date
    const interval = setInterval(updateDate, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex w-[22%] transition-all duration-300">
      <aside className="w-full p-[20px] bg-white border-r shadow-lg">
        <div className="flex items-center justify-center gap-4">
          <img
            src="/LeftColumn/Logo.png"
            alt="logo"
            className="object-contain w-14 h-14"
          />
          <div className="">
            <h1 className="text-lg font-bold ">Welcome, Aryans</h1>
            <p className="text-sm text-gray-500">{currentDate}</p>
          </div>
        </div>
        <h2 className="m-4 font-bold">Filter</h2>

        {/* City Filter */}
        <div>
          <label className="block mb-2 text-gray-500">City</label>
          <select
            className="border rounded p-2 w-[80%]"
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">All Cities</option>
            {[...new Set(properties?.map((p) => p.city_name) || [])].map(
              (city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              )
            )}
          </select>
        </div>

        {/* Property Type Filter */}
        <div className="p-4">
          <h2 className="mb-4 text-lg font-bold">Filter by Property Type</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="RES1"
                onChange={() => handleCheckboxChange("RES1")}
                checked={selectedPropertyTypes.includes("RES1")}
              />
              <span className="mx-2">(RES1)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="RES2"
                onChange={() => handleCheckboxChange("RES2")}
                checked={selectedPropertyTypes.includes("RES2")}
              />
              <span className="mx-2">(RES2)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="Commercial"
                onChange={() => handleCheckboxChange("Commercial")}
                checked={selectedPropertyTypes.includes("Commercial")}
              />
              <span className="mx-2">Commercial</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="Retail"
                onChange={() => handleCheckboxChange("Retail")}
                checked={selectedPropertyTypes.includes("Retail")}
              />
              <span className="mx-2">Retail</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="Plot"
                onChange={() => handleCheckboxChange("Plot")}
                checked={selectedPropertyTypes.includes("Plot")}
              />
              <span className="mx-2">Plot</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="Industrial"
                onChange={() => handleCheckboxChange("Industrial")}
                checked={selectedPropertyTypes.includes("Industrial")}
              />
              <span className="mx-2">Industrial</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="Warehouse"
                onChange={() => handleCheckboxChange("Warehouse")}
                checked={selectedPropertyTypes.includes("Warehouse")}
              />
              <span className="mx-2">Warehouse</span>
            </label>
          </div>
        </div>

        <div className="w-full max-w-sm p-1">
          {/* MUI Slider Component */}
          <Box sx={{ width: "100%", paddingBottom: "1rem" }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={100}
              disabled={anyPrice}
              sx={{
                "& .MuiSlider-thumb": {
                  width: 12,
                  height: 12,
                  backgroundColor: "blue",
                  borderRadius: "50%",
                },
                "& .MuiSlider-rail": {
                  opacity: 0.2,
                },
                "& .MuiSlider-track": {
                  backgroundColor: "blue",
                },
              }}
            />
          </Box>

          {/* Dynamic price labels under each handle */}
          <div className="flex items-center justify-between -mt-4 text-sm text-gray-500">
            <div>${priceRange[0].toLocaleString()}</div>
            <div>${priceRange[1].toLocaleString()}</div>
          </div>

          {/* Any price checkbox */}
        </div>

        <label className="flex items-center gap-2 mt-2 ">
          <input
            type="checkbox"
            name="propertyType"
            className="w-4 h-4 text-blue-500"
          />
          <span>Any Price</span>
        </label>

        {/* size */}
        <div className="mt-4">
          <label className="block mb-2 font-medium text-gray-500">Size</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              className=" w-[40%] border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              className=" w-[40%] border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {/* Unit */}
            <span className="flex items-center text-sm text-gray-500">
              sq ft
            </span>
          </div>
        </div>
        <div className="flex justify-center gap-10 py-3 mt-4">
          {/* <button className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">Cancel</button>
          <button className="px-4 py-3 text-white bg-blue-900 rounded-md hover:bg-blue-800">
            Apply filters
          </button> */}
        </div>
        <div className="flex items-center justify-center my-3 space-x-4">
          <button
            onClick={handleLogOut}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 "
          >
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default UserSidebar;
