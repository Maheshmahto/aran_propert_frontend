import React, { useState } from "react";
import Modal from "react-modal";
import { MdCancel } from "react-icons/md";
import Model from "react-modal";

const CommercialPropertyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    workstationType: "Cubicle",
    workstationCount: "",
    cabinCount: "",
    meetingRoom: "",
    conferenceRoom: "",
    cafeteriaSeats: "",
    washrooms: "",
    pantryArea: true,
    backupRoom: true,
    serverRoom: true,
    receptionArea: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const handleCancel = () => {
    setFormData({
      workstationType: "Cubicle",
      workstationCount: "",
      cabinCount: "",
      meetingRoom: "",
      conferenceRoom: "",
      cafeteriaSeats: "",
      washrooms: "",
      pantryArea: true,
      backupRoom: true,
      serverRoom: true,
      receptionArea: true,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backdropFilter: "blur(3px)",
          zIndex: 10,
        },
        content: {
          width: "70%",
          height: "90%",
          margin: "auto",
          borderRadius: "10px",
          boxShadow: "1px 1px 10px gray",
          backgroundColor: "white",
          overflow: "visible",
        },
      }}
    >
      <div className="relative p-6">
        <button onClick={onClose} className="absolute top-2 right-2">
          <MdCancel className="text-gray-500 hover:text-red-600 text-xl" />
        </button>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-3">
          <div>
            <h2 className="font-semibold text-lg mb-2">1. Workstation</h2>

            <input
              type="number"
              name="workstationCount"
              value={formData.workstationCount}
              onChange={handleInputChange}
              placeholder="Number of Workstations"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none "
            />
            <div className="flex gap-4 mt-4">
              {["Cubicle", "Linear", "Both"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="workstationType"
                    value={option}
                    checked={formData.workstationType === option}
                    onChange={handleInputChange}
                    className="hover:cursor-pointer w-4 h-4 text-blue-500 accent-blue-700"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {[
            { label: "Cabin", key: "cabinCount" },
            { label: "Meeting Room", key: "meetingRoom" },
            { label: "Conference Room", key: "conferenceRoom" },
            { label: "Cafeteria Seats", key: "cafeteriaSeats" },
            { label: "Washrooms", key: "washrooms" },
          ].map(({ label, key }, index) => (
            <div key={index}>
              <h2 className="font-semibold text-lg mb-2">
                {index + 2}. {label}
              </h2>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                placeholder={`Number of ${label}`}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none "
              />
            </div>
          ))}

          {[
            { label: "Pantry Area", key: "pantryArea" },
            { label: "Backup Room", key: "backupRoom" },
            { label: "Server Room", key: "serverRoom" },
            { label: "Reception Area", key: "receptionArea" },
          ].map(({ label, key }, index) => (
            <div key={index + 6}>
              <h2 className="font-semibold text-lg mb-2">
                {index + 7}. {label}
              </h2>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={key}
                  checked={formData[key]}
                  onChange={handleInputChange}
                  className=" w-4 h-4 hover:cursor-pointer accent-blue-800"
                />
                Yes
              </label>
            </div>
          ))}

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CommercialPropertyModal;
