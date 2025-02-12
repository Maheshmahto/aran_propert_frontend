import React, { useState, useEffect } from "react";
import axios from "../helper/axios";
import Modal from "react-modal";
import { MdCancel, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const Client = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    Emial: "",
    Conatct_Number: "",
    Location: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios
      .get("/api/clients/")
      .then((response) => {
        setClients(response.data);
        setFilteredClients(response.data); // Initialize filtered data
      })
      .catch((error) => console.error("Error fetching clients:", error));
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = clients.filter(
      (client) =>
        client.Name.toLowerCase().includes(value) ||
        client.Emial.toLowerCase().includes(value) ||
        client.Conatct_Number.toLowerCase().includes(value) ||
        client.Location.toLowerCase().includes(value)
    );
    setFilteredClients(filtered);
  };

  // Handle form submission (Add or Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      axios
        .put(`/api/clients/${selectedClientId}`, formData)
        .then(() => {
          Swal.fire(
            "Updated!",
            "Client details updated successfully",
            "success"
          );
          fetchClients();
          closeModal();
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to update client", "error");
        });
    } else {
      axios
        .post("/api/clients/", formData)
        .then((response) => {
          setClients([...clients, response.data]);
          setFilteredClients([...clients, response.data]); // Update filtered list
          Swal.fire("Added!", "Client added successfully", "success");
          closeModal();
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to add client", "error");
        });
    }
  };

  // Handle delete
  const handleDelete = (clientId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/clients/${clientId}`)
          .then(() => {
            Swal.fire("Deleted!", "Client deleted successfully", "success");
            const updatedClients = clients.filter(
              (client) => client.client_id !== clientId
            );
            setClients(updatedClients);
            setFilteredClients(updatedClients);
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete client", "error");
          });
      }
    });
  };

  // Open modal for editing
  const handleEdit = (client) => {
    setEditMode(true);
    setSelectedClientId(client.client_id);
    setFormData(client);
    setIsOpen(true);
  };

  // Close modal and reset form
  const closeModal = () => {
    setIsOpen(false);
    setEditMode(false);
    setSelectedClientId(null);
    setFormData({ Name: "", Emial: "", Conatct_Number: "", Location: "" });
  };

  return (
    <div className="pb-16 mx-10 my-24">
      <div className="flex justify-between">
        {/* Search Input */}
        <div className="flex gap-4 items-center border border-gray-300 rounded-md w-[30%] px-4 py-2">
          <img
            className="object-none"
            src="/LeftColumn/search-normal.png"
            alt=""
          />
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Search by Name, Email, Contact, or Location"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button
          type="button"
          className="px-10 py-2 text-xl text-white bg-blue-900 rounded-md hover:bg-blue-800"
          onClick={() => setIsOpen(true)}
        >
          Add
        </button>
      </div>

      {/* Modal for Adding/Editing a Client */}
      <Modal
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
        <button onClick={closeModal}>
          <MdCancel className="absolute top-3 right-3 size-5 hover:text-red-800" />
        </button>
        <h2 className="mb-4 text-xl font-bold">
          {editMode ? "Edit Client" : "Add Client"}
        </h2>
        <form onSubmit={handleSubmit}>
          {["Name", "Emial", "Conatct_Number", "Location"].map((field) => (
            <div key={field} className="mb-3">
              <label className="block pb-1">{field.replace("_", " ")}</label>
              <input
                className="w-full p-2 border rounded-md"
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full px-5 py-2 text-white bg-blue-900 rounded-md"
          >
            {editMode ? "Update Client" : "Add Client"}
          </button>
        </form>
      </Modal>

      {/* Client Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-center border border-gray-300">
          <thead className="h-12 text-white bg-blue-800">
            <tr>
              {/* <th className="px-4 py-2 border">ID</th> */}
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Contact Number</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody className="mb-12">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client.client_id} className="border">
                  {/* <td className="px-4 py-2 border">{client.client_id}</td> */}
                  <td className="px-4 py-2 border">{client.Name}</td>
                  <td className="px-4 py-2 border text-wrap">{client.Emial}</td>
                  <td className="px-4 py-2 border">{client.Conatct_Number}</td>
                  <td className="px-4 py-2 border">{client.Location}</td>
                  <td className="flex justify-center gap-4 px-4 py-2">
                    <FaEdit
                      className="text-blue-600 cursor-pointer"
                      onClick={() => handleEdit(client)}
                    />
                    <MdDelete
                      className="text-red-600 cursor-pointer"
                      onClick={() => handleDelete(client.client_id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-gray-500">
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Client;
