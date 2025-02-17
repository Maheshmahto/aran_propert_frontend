import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { MdCancel } from "react-icons/md";
import axios from "../helper/axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Descriptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [descriptions, setDescriptions] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const response = await axios.get("/api/descriptions/");
        setDescriptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching descriptions:", error);
        setError("Failed to fetch descriptions.");
        setLoading(false);
      }
    };

    fetchDescriptions();
  }, []);

  const handleAddDescription = async () => {
    if (!newDescription.trim()) {
      setError("Description cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("/api/description/", {
        description: newDescription,
      });

      setDescriptions([...descriptions, response.data]);
      setNewDescription("");
      setDescriptionModal(false);
      setError("");

      Swal.fire({
        icon: "success",
        title: "Description Added!",
        text: "New description has been successfully saved.",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      setError("Failed to add description. Please try again.");

      Swal.fire({
        icon: "error",
        title: "Failed to Add Description",
        text: error.response?.data?.detail || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto my-16 px-6">
      <Link to="/admin-inputfield" className="flex items-center text-blue-800 hover:text-blue-700">
        Back 
      </Link>

      <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-5">
        <h2 className="text-2xl font-bold text-gray-800">Property Descriptions</h2>
        <button
          onClick={() => setDescriptionModal(true)}
          className="px-6 py-2 text-white bg-blue-800 rounded-md shadow-md hover:bg-blue-900 transition"
        >
          Add Description
        </button>
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Description Details</h3>
        {loading ? (
          <p className="text-gray-600">Loading descriptions...</p>
        ) : descriptions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Last Edited</th>
                </tr>
              </thead>
              <tbody>
                {descriptions.map((desc) => (
                  <tr key={desc.des_id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{desc.des_id}</td>
                    <td className="p-3">{desc.description}</td>
                    <td className="p-3">{new Date(desc.edit_date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-red-500">No descriptions available.</p>
        )}
      </div>

      <Modal
        isOpen={descriptionModal}
        onRequestClose={() => setDescriptionModal(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
          <button
            onClick={() => setDescriptionModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <MdCancel size={24} />
          </button>
          <h2 className="text-xl font-semibold mb-4">Add New Description</h2>
          <textarea
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter description..."
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddDescription}
              className="px-6 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Descriptions;
