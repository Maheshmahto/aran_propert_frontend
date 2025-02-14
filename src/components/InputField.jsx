import React from "react";
import { useState } from "react";
import Model from "react-modal";
import { MdCancel } from "react-icons/md";
import { useEffect} from "react";
import axios from "../helper/axios";

const InputField = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/get_all_users");
        console.log(response.data);

        setUsers(Array.isArray(response.data.data) ? response.data.data : []);
      
        console.log(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="mx-10 my-24">
      <div className="mt-7 table-container ">
        <div className="flex justify-between w-[70%] items-center ">
          <div className="px-20 py-5 shadow-xl">Property type</div>

          <div className="px-20 py-5 shadow-xl">Description</div>

          <div>
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="px-10 py-2 text-xl text-white bg-blue-900 rounded-md shadow-md "
            >
              Add
            </button>

            <Model
              isOpen={isOpen}
              style={{
                overlay: {
                  backdropFilter: "blur(3px)",
                  zIndex: 10,
                },
                content: {
                  width: "25%",
                  height: "27%",
                  margin: "auto",
                  borderRadius: "10px",
                  boxShadow: "1px 1px 10px gray",
                  backgroundColor: "white",
                  overflow: "visible",
                },
              }}
            >
              <div className="px-4 my-3">
                <h1>Name</h1>

                <input
                  className="px-4 py-2 my-2 border-2 rounded-md"
                  type="text"
                  name=""
                  placeholder="Add Property Type"
                  id=""
                />

                <button className="block px-4 py-3 m-auto mt-3 text-white bg-blue-800 rounded-md">
                  Save
                </button>
              </div>
              <button
                onClick={() => {
                  setIsOpen(close);
                }}
              >
                <MdCancel className="absolute top-3 right-3 size-5 hover:text-red-800" />{" "}
              </button>
            </Model>
          </div>
        </div>

        <table className="w-1/2 mt-12 text-center">
          <tr className="h-12 text-white bg-blue-800 ">
            <th className="border"> ID</th>
            <th className="border ">Name</th>
          </tr>
          {
            users.map((user)=>(
              <tr className="p-4">
              <td className="p-4">{user.user_id}</td>
              <td>{user.username}</td>
            </tr>
            ))           
          }
         

          
        </table>
      </div>
    </div>
  );
};

export default InputField;
