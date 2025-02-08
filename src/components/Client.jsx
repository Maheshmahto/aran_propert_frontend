import React, { useState, useEffect } from "react";
import axios from "../helper/axios";
import Model from "react-modal";
import { MdCancel } from "react-icons/md";

const Client = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Emial: "",
    Conatct_Number: "",
    Location: "",
  });

  // Fetch client data from FastAPI
  useEffect(() => {
    axios
      .get("/api/clients/")
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/clients/", formData)
      .then((response) => {
        setClients([...clients, response.data]); // Update table data
        setIsOpen(false); // Close modal
        setFormData({ Name: "", Emial: "", Conatct_Number: "", Location: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding client:", error));
  };

  return (
    <div className="mx-10 my-48">
      <div className="flex justify-between h-10">
        <div className="flex gap-4 items-center border border-gray-300 rounded-md w-[30%] px-4 py-2">
          <input className="w-full outline-none" type="text" placeholder="Search by Client" />
        </div>
        <button
          className="px-10 py-2 text-xl text-white bg-blue-900 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          Add
        </button>
      </div>

      {/* Modal for adding a client */}
      <Model
        isOpen={isOpen}
        style={{
          overlay: { backdropFilter: "blur(3px)", zIndex: 10 },
          content: {
            width: "30%",
            height: "auto",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "1px 1px 10px gray",
          },
        }}
      >
        <button onClick={() => setIsOpen(false)}>
          <MdCancel className="absolute top-3 right-3 size-5 hover:text-red-800" />
        </button>
        <h2 className="mb-4 text-xl font-bold">Add Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block pb-1">Name</label>
            <input className="w-full p-2 border rounded-md" type="text" name="Name" value={formData.Name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="block pb-1">Email</label>
            <input className="w-full p-2 border rounded-md" type="email" name="Emial" value={formData.Emial} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="block pb-1">Contact Number</label>
            <input className="w-full p-2 border rounded-md" type="text" name="Conatct_Number" value={formData.Conatct_Number} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="block pb-1">Location</label>
            <input className="w-full p-2 border rounded-md" type="text" name="Location" value={formData.Location} onChange={handleChange} required />
          </div>
          <button type="submit" className="w-full px-5 py-2 text-white bg-blue-900 rounded-md">
            Add Client
          </button>
        </form>
      </Model>

      {/* Client Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-center border border-gray-300">
          <thead className="h-12 text-white bg-blue-800">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Contact Number</th>
              <th className="px-4 py-2 border">Location</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.client_id} className="border">
                  <td className="px-4 py-2 border">{client.client_id}</td>
                  <td className="px-4 py-2 border">{client.Name}</td>
                  <td className="px-4 py-2 border">{client.Emial}</td>
                  <td className="px-4 py-2 border">{client.Conatct_Number}</td>
                  <td className="px-4 py-2 border">{client.Location}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-gray-500">No clients found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Client;