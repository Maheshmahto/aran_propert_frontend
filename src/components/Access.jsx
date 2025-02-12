import "react";
import { useEffect, useState } from "react";
import axios from "../helper/axios";

const Access = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/get_all_users");
        setUsers(Array.isArray(response.data.data) ? response.data.data : []);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="mx-10 my-24">
      <div className="flex justify-between h-10 ">
        <div className="flex gap-4 border border-gray-400 w-[30%] px-4 py-7 items-center ">
          <img
            className="object-none"
            src="/LeftColumn/search-normal.png"
            alt=""
          />{" "}
          <input className="outline-none" type="text" placeholder="search" />
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
            <th className="border ">User Type</th>

            <th className="border">NEW</th>
            <th className="border">EDIT</th>
            <th className="border"> DELETE</th>
            <th className="border"> VIEW</th>
            <th className="border"> PRINT</th>
            <th className="border"> EDIT/DELETE</th>
          </tr>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.user_type}</td>
              <td className="p-4">
                <input className="w-4 h-4" type="checkbox" name="" id="" />
              </td>
              <td className="p-4">
                <input className="w-4 h-4" type="checkbox" name="" id="" />
              </td>
              <td className="p-4">
                <input className="w-4 h-4" type="checkbox" name="" id="" />
              </td>
              <td className="p-4">
                <input className="w-4 h-4" type="checkbox" name="" id="" />
              </td>
              <td className="p-4">
                <input className="w-4 h-4" type="checkbox" name="" id="" />
              </td>
              <td className="flex justify-center gap-3 py-4">
                <button>
                  <img src="/LeftColumn/bxs_edit.png" alt="" />
                </button>
                <img src="/LeftColumn/_.png" alt="" />
                <button>
                  <img src="/LeftColumn/ic_baseline-delete.png" alt="" />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Access;
