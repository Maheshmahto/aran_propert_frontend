import { useEffect, useState } from "react";
import axios from "../helper/axios";
import Modal from "react-modal";
import { MdCancel,MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const User = () => {
  const closeModal = () => {
    setIsEditOpen(false);
    setIsAddOpen(false);
  };

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    phone_no: "",
    user_type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/get_all_users");
      setUsers(Array.isArray(response.data.data) ? response.data.data : []);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch users. Please try again.",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const CreatenewUser = async () => {
    try {
      const response = await axios.post(
        `/api/insert/AriyanspropertiesUser_register/`,
        inputData
      );

      if (response?.data) {
        Swal.fire({
          icon: "success",
          title: "User registered successfully",
          text: "Redirecting...",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.response?.data?.detail ||
          "An error occurred. Please try again.",
      });
    }
  };

  const handleAddUser = async () => {
    if (
      !inputData.username ||
      !inputData.email ||
      !inputData.phone_no ||
      !inputData.user_type
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Data",
        text: "Please fill all required fields",
      });
      return;
    }

    try {
      await CreatenewUser();
      setIsAddOpen(false);
      setInputData({
        username: "",
        email: "",
        phone_no: "",
        user_type: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDelete = async (userId) => {
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
          .delete(`/api/delete/AriyanspropertiesUser/${userId}`)
          .then(() => {
            Swal.fire("Deleted!", "Client deleted successfully", "success");
            const updatedUser = users.filter((user) => user.user_id !== userId);
            setUsers(updatedUser);
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete client", "error");
          });
      }
    });
  };

  const handleEdit = (user) => {
    setIsEditOpen(true);
    setSelectedUser(user);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser?.user_id || !selectedUser?.user_type) {
      Swal.fire({
        icon: "error",
        title: "Invalid Data",
        text: "User ID and type are required",
      });
      return;
    }

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: "Please login again",
        });
        return;
      }

      const response = await axios.put(
        `/api/update_user_type?user_id=${selectedUser.user_id}&user_type=${selectedUser.user_type}`,
        {}, // Empty body since we're using query parameters
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data) {
        await Swal.fire(
          "Updated!",
          "Client details updated successfully",
          "success"
        );
        await fetchUsers();
        closeModal();
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "User Update Failed",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20 mx-10 my-24">
      <div className="flex justify-between ">
        <div className="flex gap-4 items-center border border-gray-300 rounded-md w-[30%] px-4 py-2">
          <img
            className="object-none"
            src="/LeftColumn/search-normal.png"
            alt=""
          />
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="px-10 py-2 text-xl text-white bg-blue-900 rounded-md hover:bg-blue-800"
          onClick={() => setIsAddOpen(true)}
        >
          Add
        </button>
      </div>

      <table className="w-full mt-12 text-center table-container">
        <thead>
          <tr className="h-12 text-white bg-blue-800">
            {/* <th className="border">UserID</th> */}
            <th className="border">Username</th>
            <th className="border">Email Address</th>
            <th className="border">Status</th>
            <th className="border">Phone No.</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.user_id} className="border">
              {/* <td className="px-4 py-2 border">{user.user_id}</td> */}
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.user_type}</td>
              <td className="px-4 py-2 border">{user.phone_no}</td>
              <td className="flex justify-center gap-3">
              <FaEdit
                  className="text-blue-600 cursor-pointer"
                  onClick={() => handleEdit(user)}
                />
                <MdDelete
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleDelete(user.user_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddOpen}
        style={{
          overlay: {
            zIndex: 10,
            backdropFilter: "blur(3px)",
          },
          content: {
            width: "40%",
            height: "40%",
            margin: "auto",
            borderRadius: "10px",
            boxShadow: "1px 1px 10px gray",
            overflow: "hidden",
          },
        }}
      >
        <div className="flex items-center justify-around py-4">
          <div>
            <h1 className="pb-3">Name</h1>
            <input
              className="p-2 border rounded-md"
              type="text"
              name="username"
              value={inputData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h1 className="pb-3">Email</h1>
            <input
              className="p-2 border rounded-md"
              type="email"
              name="email"
              value={inputData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-around">
          <div>
            <h1 className="pb-3">Phone Number</h1>
            <input
              className="p-2 border rounded-md"
              type="text"
              name="phone_no"
              value={inputData.phone_no}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <h1 className="pb-3">User Type</h1>
            <select
              className="p-2 border rounded-md"
              name="user_type"
              value={inputData.user_type}
              onChange={handleInputChange}
            >
              <option value="">Select Type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        <div className="mt-7 mx-[40%]">
          <button
            type="button"
            className="px-10 py-2 text-lg text-white bg-blue-900 rounded-md"
            onClick={handleAddUser}
          >
            Add
          </button>
        </div>
        <button onClick={() => setIsAddOpen(false)}>
          <MdCancel className="absolute top-3 right-3 size-5 hover:text-red-800" />
        </button>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditOpen}
        style={{
          overlay: {
            zIndex: 10,
            backdropFilter: "blur(3px)",
          },
          content: {
            width: "40%",
            height: "40%",
            margin: "auto",
            borderRadius: "10px",
            boxShadow: "1px 1px 10px gray",
            overflow: "hidden",
          },
        }}
      >
        {selectedUser && (
          <>
            <div className="flex items-center justify-around py-4">
              <div>
                <h1 className="pb-3">Name</h1>
                <input
                  className="p-2 bg-gray-100 border rounded-md"
                  type="text"
                  value={selectedUser.username || ""}
                  readOnly
                />
              </div>
              <div>
                <h1 className="pb-3">Email</h1>
                <input
                  className="p-2 bg-gray-100 border rounded-md"
                  type="email"
                  value={selectedUser.email || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="flex items-center justify-around">
              <div>
                <h1 className="pb-3">Phone Number</h1>
                <input
                  className="p-2 bg-gray-100 border rounded-md"
                  type="text"
                  value={selectedUser.phone_no || ""}
                  readOnly
                />
              </div>
              <div>
                <h1 className="pb-3">User Type</h1>
                <select
                  className="p-2 px-16 border rounded-md"
                  value={selectedUser.user_type || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      user_type: e.target.value,
                    })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            <div className="mt-7 mx-[40%]">
              <button
                type="button"
                className="px-10 py-2 text-lg text-white bg-blue-900 rounded-md"
                onClick={handleUpdateUser}
              >
                Update
              </button>
            </div>
          </>
        )}
        <button onClick={() => setIsEditOpen(false)}>
          <MdCancel className="absolute top-3 right-3 size-5 hover:text-red-800" />
        </button>
      </Modal>
    </div>
  );
};

export default User;
