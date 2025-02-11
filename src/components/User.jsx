import { useEffect, useState } from "react";
import axios from "../helper/axios";
import Model from "react-modal";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputData, setInputData] = useState({
    user_email: "",
    phone_no: "",
    user_password: "",
    user_name: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/get_all_users");
        setUsers(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
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
        text: error.response?.data?.detail || "An error occurred. Please try again.",
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
          <img className="object-none" src="/LeftColumn/search-normal.png" alt="" />
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="px-10 py-2 text-xl text-white bg-blue-900 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          Add
        </button>
      </div>

      <table className="w-full mt-12 text-center table-container">
        <thead>
          <tr className="h-12 text-white bg-blue-800">
            <th className="border">UserID</th>
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
              <td className="px-4 py-2 border">{user.user_id}</td>
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.user_type}</td>
              <td className="px-4 py-2 border">{user.phone_no}</td>
              <td className="flex justify-center gap-3">
                <button>
                  <img src="/LeftColumn/bxs_edit.png" alt="" />
                </button>
                <button>
                  <img src="/LeftColumn/ic_baseline-delete.png" alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Modal */}
      <Model
        isOpen={isOpen}
        style={{
          overlay: { zIndex: 10, backdropFilter: "blur(3px)" },
          content: {
            width: "40%", height: "350px", margin: "auto",
            borderRadius: "10px", boxShadow: "1px 1px 10px gray"
          },
        }}
      >
        <div className="flex items-center justify-around py-4">
          <div>
            <h1 className="pb-3">Name</h1>
            <input
              className="p-2 border rounded-md"
              type="text"
              value={inputData.user_name}
              placeholder="Enter Name"
              onChange={(e) =>
                setInputData({ ...inputData, user_name: e.target.value })
              }
            />
          </div>
          <div>
            <h1 className="pb-3">Email</h1>
            <input
              className="p-2 border rounded-md"
              type="email"
              value={inputData.user_email}
              placeholder="Enter Email"
              onChange={(e) =>
                setInputData({ ...inputData, user_email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-around">
          <div>
            <h1 className="pb-3">Phone Number</h1>
            <input
              className="p-2 border rounded-md"
              type="number"
              value={inputData.phone_no}
              placeholder="Enter Phone Number"
              onChange={(e) =>
                setInputData({ ...inputData, phone_no: e.target.value })
              }
            />
          </div>
          <div>
            <h1 className="pb-3">Password</h1>
            <input
              className="p-2 border rounded-md"
              type="password"
              value={inputData.user_password}
              placeholder="Enter Password"
              onChange={(e) =>
                setInputData({ ...inputData, user_password: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-7 mx-[40%]">
          <button
            onClick={CreatenewUser}
            className="px-10 py-2 text-lg text-white bg-blue-900 rounded-md"
          >
            Add
          </button>
        </div>
        <button onClick={() => setIsOpen(false)}>
          <MdCancel className="absolute top-3 right-3 size-5 hover:text-red-800" />
        </button>
      </Model>
    </div>
  );
};

export default User;
