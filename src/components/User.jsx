import React, { useEffect, useState } from "react";
//import React, { useEffect, useState } from "react";
import axios from "../helper/axios";
import Swal from "sweetalert2";
import Model from "react-modal";
import { MdCancel } from "react-icons/md";
//import Modal from "./Modal";

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [inputData, setInputData] = useState({
    email: "",
    phone_no: "",
    user_type: "",
    username: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/get_all_users");
        setUser(Array.isArray(response.data.data) ? response.data.data : []);
        console.log(response.data.data, "data");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mx-10 my-48">
      <div className="flex justify-between h-10 ">
        <div className="flex gap-4 items-center border border-gray-300 rounded-md w-[30%]  px-4 py-7">
          <img
            className="object-none"
            src="/LeftColumn/search-normal.png"
            alt=""
          />{" "}
          <input
            className="outline-none"
            type="text"
            placeholder="Search by Name"
          />
        </div>
        <div className="">
          <button
            type="button"
            className="px-10 py-2 text-xl text-white bg-blue-900 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            Add
          </button>

          <Model
            isOpen={isOpen}
            style={{
              overlay: {
                // Darken the background
                zIndex: 10, // Ensure it's on top
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
                  id=""
                  value={inputData.username}
                />
              </div>
              <div>
                <h1 className="pb-3">Email</h1>
                <input
                  className="p-2 border rounded-md"
                  type="email"
                  name="email"
                  id=""
                  value={inputData.email}
                />
              </div>
            </div>

            <div className="flex items-center justify-around">
              <div>
                <h1 className="pb-3">Phone Number</h1>
                <input
                  className="p-2 border rounded-md"
                  type="number"
                  name="phone_no"
                  id=""
                  value={inputData.phone_no}
                  
                />
              </div>
              <div>
                <h1 className="pb-3">Password</h1>
                <input
                  className="p-2 border rounded-md"
                  type="password"
                  name=""
                  id=""
                />
              </div>
            </div>

            <div className="mt-7 mx-[40%]">
              <button
                type="button"
                className="px-10 py-2 text-lg text-white bg-blue-900 rounded-md"
              >
                Add
              </button>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <MdCancel className="absolute top-3 right-3 size-5 hover:text-red-800" />{" "}
            </button>
          </Model>
        </div>
      </div>

      
        <table className="w-full mt-12 text-center table-container">
          <thead>
            <tr className="h-12 text-white bg-blue-800 ">
              <th className="border"> UserID</th>
              <th className="border"> Username</th>
              <th className="border ">Email Address</th>
              <th className="border">Status</th>
              {/* <th className="border">Password Change</th> */}
              <th className="border">Phone No.</th>
              <th className="border"> Actions</th>
            </tr>
          </thead>

          <tbody>
            {user.map((user) => (
              <tr key={user.id}>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.user_type}</td>
                <td className="px-4 py-2">{user.phone_no}</td>
                <td className="flex justify-center gap-3">
                  <button>
                    <img src="/LeftColumn/bxs_edit.png" alt="" />
                  </button>
                  <img src="/LeftColumn/_.png" alt="" />
                  <button>
                    <img
                      src="/LeftColumn/ic_baseline-delete.png"
                      alt=""
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
      {/* <table className="w-full mt-12 text-center">
        <thead>
          <tr className="h-12 text-white bg-blue-800 ">
            <th className="border"> Username</th>
            <th className="border ">Email Address</th>
            <th className="border">Status</th>
            <th className="border">Password Change</th>
            <th className="border"> Actions</th>
          </tr>
        </thead>

        

        <tr>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td className="flex justify-center gap-3">
            <button>
              <img src="/LeftColumn/bxs_edit.png" alt="" />
            </button>
            <img src="/LeftColumn/_.png" alt="" />
            <button>
              <img src="/LeftColumn/ic_baseline-delete.png" alt="" />
            </button>
          </td>
        </tr>

        <tr>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
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

        <tr>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td className="flex justify-center gap-3 py-4 ">
            <button>
              <img src="/LeftColumn/bxs_edit.png" alt="" />
            </button>
            <img src="/LeftColumn/_.png" alt="" />
            <button>
              <img src="/LeftColumn/ic_baseline-delete.png" alt="" />
            </button>
          </td>
        </tr>

        <tr>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
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

        <tr>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
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

        <tr>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
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

        <tr>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
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

        <tr>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
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
      </table> */}
    </div>
  );
};

export default User;
