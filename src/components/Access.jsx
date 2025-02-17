import "react";
import { useEffect, useState } from "react";
import axios from "../helper/axios";
import Swal from "sweetalert2";

const Access = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const updatePermission = async (userId, permissionType, isChecked) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${isChecked ? "enable" : "disable"} this permission?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (isConfirmed) {
      try {
        const response = await axios.put(`/api/permissions/${permissionType}/${userId}`, {
          enabled: isChecked,
        });
        if (response?.data) {
          await Swal.fire({
            icon: "success",
            title: "User permission updated successfully",
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
          title: "Permission update failed",
          text: error.response?.data?.detail || "An error occurred. Please try again.",
        });
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-10 ml-20 my-24">
      <div className="flex justify-between h-10 ">
        <div className="flex gap-4 border border-gray-400 w-[30%] px-4 py-7 items-center ">
          <img className="object-none" src="/LeftColumn/search-normal.png" alt="" />
          <input
            className="outline-none"
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <button className="px-10 py-2 text-xl text-white bg-blue-900 rounded-md hover:bg-blue-800">
            Save
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="w-full mt-12 text-center ">
          <tr className="h-12 text-white bg-blue-800 ">
            <th className="border"> Name</th>
            <th className="border">User Type</th>
            <th className="border">CAN ADD</th>
            <th className="border">CAN EDIT</th>
            <th className="border">CAN DELETE</th>
            <th className="border">CAN VIEW</th>
            <th className="border">CAN PRINT</th>
          </tr>
          {filteredUsers.map((user) => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.user_type}</td>
              <td className="p-4">
                <input
                  type="checkbox"
                  defaultChecked={user.can_add}
                  onChange={(e) => updatePermission(user.user_id, "can_add", e.target.checked)}
                />
              </td>
              <td className="p-4">
                <input
                  type="checkbox"
                  defaultChecked={user.can_edit}
                  onChange={(e) => updatePermission(user.user_id, "can_edit", e.target.checked)}
                />
              </td>
              <td className="p-4">
                <input
                  type="checkbox"
                  defaultChecked={user.can_delete}
                  onChange={(e) => updatePermission(user.user_id, "can_delete", e.target.checked)}
                />
              </td>
              <td className="p-4">
                <input
                  type="checkbox"
                  defaultChecked={user.can_view}
                  onChange={(e) => updatePermission(user.user_id, "can_view", e.target.checked)}
                />
              </td>
              <td className="p-4">
                <input
                  type="checkbox"
                  defaultChecked={user.can_print}
                  onChange={(e) => updatePermission(user.user_id, "print-report", e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Access;
