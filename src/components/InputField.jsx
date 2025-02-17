import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { MdCancel } from "react-icons/md";
import axios from "../helper/axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const PropertyTypeManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [newPropertyType, setNewPropertyType] = useState("");
  const [error, setError] = useState("");

  // Fetch property types
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await axios.get("/api/property_types/");
        setPropertyTypes(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        setError("Failed to fetch property types.");
      }
    };
    fetchPropertyTypes();
  }, []);

  // Handle adding new property type
  const handleSave = async () => {
    if (!newPropertyType.trim()) {
      setError("Property type cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("api/property_types/", {
        category: newPropertyType,
      });

      setPropertyTypes([...propertyTypes, response.data]);
      setNewPropertyType("");
      setIsOpen(false);
      setError("");

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Property Type Added!",
        text: "The property type has been successfully added.",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

    } catch (error) {
      setError("Failed to add property type. Please try again.");

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Failed to Add Property Type",
        text: error.response?.data?.detail || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto my-16 px-6">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-5">
        <h2 className="text-2xl font-bold text-gray-800">Property Types</h2>
        <div className="space-x-4">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-2 text-white bg-blue-800 rounded-md shadow-md hover:bg-blue-900 transition"
          >
            Add Property Type
          </button>
          <Link
            to="/property_Disriptions"
            className="px-6 py-2 text-white bg-blue-800 rounded-md shadow-md hover:bg-blue-9000 transition"
          >
             View Property Disriptions
          </Link>
        </div>
      </div>

      {/* Property Type Table */}
      <div className="mt-8 overflow-x-auto">
        <table className="w-full max-w-3xl mx-auto text-center border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-800 text-white h-12">
              <th className="border px-4 py-3">ID</th>
              <th className="border px-4 py-3">Category</th>
            </tr>
          </thead>
          <tbody>
            {propertyTypes.length > 0 ? (
              propertyTypes.map((item, index) => (
                <tr key={index} className="border text-gray-700 hover:bg-gray-100 transition">
                  <td className="p-4 border">{item.type_id || "N/A"}</td>
                  <td className="p-4 border">{item.category || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-4 border text-gray-500">
                  No property types available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Property Type */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition"
          >
            <MdCancel size={24} />
          </button>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Add Property Type</h2>
          <input
            className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter property type"
            value={newPropertyType}
            onChange={(e) => setNewPropertyType(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            onClick={handleSave}
            className="mt-4 w-full px-4 py-3 text-white bg-blue-800 rounded-md hover:bg-blue-900 transition"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PropertyTypeManager;
