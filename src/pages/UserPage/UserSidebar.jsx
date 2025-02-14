
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
    setSelectedPropertyTypes((prev) =>
      prev.includes(propertyType)
        ? prev.filter((type) => type !== propertyType) // Remove if already selected
        : [...prev, propertyType] // Add if not selected
    );
  };

  // Get unique cities from properties
  const availableCities = [...new Set(properties.map((p) => p.city_name))];

  // Get property types based on selected city
  const filteredPropertyTypes = selectedCity
    ? [...new Set(properties
        .filter((p) => p.city_name === selectedCity)
        .map((p) => p.property_type)
      )]
    : [...new Set(properties.map((p) => p.property_type))];

  useEffect(() => {
    let filtered = properties;

    // Filter by city if selected
    if (selectedCity && selectedCity !== "") {
      filtered = filtered.filter((property) => property.city_name?.toLowerCase() === selectedCity.toLowerCase());
    }

    // Filter by property types if any are selected
    if (selectedPropertyTypes.length > 0) {
      filtered = filtered.filter((property) =>
        selectedPropertyTypes.includes(property.property_type)
      );
    }

    setFilteredPropertiesSidebar(filtered);
  }, [selectedCity, selectedPropertyTypes, properties]);

  // Reset property types when city changes
  useEffect(() => {
    setSelectedPropertyTypes([]);
  }, [selectedCity]);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(now);

      setCurrentDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex transition-all duration-300">
      <aside className="w-full p-[15px] bg-white border-r shadow-lg">
        <div className="flex items-center justify-center gap-4">
          <img src="/LeftColumn/Logo.png" alt="logo" className="object-contain w-18 h-18" />
          <div className="mt-3">
            <h1 className="text-lg font-bold">Welcome, Aryans</h1>
            <p className="text-sm mt text-gray-500">{currentDate}</p>
          </div>
        </div>

        {/* City Filter */}
        <div className="p-3 mt-6">
          <label className="block mb-2 text-gray-500 font-medium">City</label>
          <select
            className="border rounded p-2 w-[100%]"
            onChange={(e) => setSelectedCity(e.target.value)}
            value={selectedCity}
          >
            <option value="">All Cities</option>
            {availableCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Filter (Filtered based on City Selection) */}
        <div className="p-3">
          <h2 className="mb-3 text-gray-500 font-medium">Property Type</h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredPropertyTypes.map((type, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={type}
                  onChange={() => handleCheckboxChange(type)}
                  checked={selectedPropertyTypes.includes(type)}
                />
                <span className="mx-2">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="w-full max-w-sm p-3">
        <label className="block text-gray-500 font-medium mb-2">
              Price Range
            </label>
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

          <div className="flex items-center justify-between -mt-4 text-sm text-gray-500">
            <div>${priceRange[0].toLocaleString()}</div>
            <div>${priceRange[1].toLocaleString()}</div>
          </div>
        </div>

        <label className="flex items-center gap-2 p-3">
          <input type="checkbox" name="propertyType" className="w-4 h-4 text-blue-500" />
          <span>Any Price</span>
        </label>

        <div className="mt-4">
            <label className="block text-gray-500 font-medium mb-2">Size</label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                className=" w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="w-[20%] items-center flex text-gray-500">
                sq ft
              </span>
            </div>
          </div> 

        <div className="flex items-center justify-center mt-8 space-x-3">
          <button onClick={handleLogOut} className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

export default UserSidebar;
