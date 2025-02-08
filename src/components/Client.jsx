import "react";
import { useState } from "react";
import Model from "react-modal";
import { MdCancel } from "react-icons/md";

const Client = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-48 mx-10">
      
      <div className="flex justify-between h-10 ">
        <div className="flex gap-4 items-center border border-gray-300 rounded-md w-[30%]  px-4 py-7">
          <img
            className="object-none"
            src="/LeftColumn/search-normal.png"
            alt=""
          />{" "}
          <input className="outline-none" type="text" placeholder="Search by Client" />
        </div>
        <div className="">
          
        <button
            type="button"
            className="bg-blue-900 text-xl py-2 px-10 rounded-md text-white"
            onClick={() => setIsOpen(true)}
          >
            Add
          </button>

          <Model
            isOpen={isOpen}
            
            
            style={{
              overlay: {
                backdropFilter: "blur(3px)", // Darken the background
                zIndex: 10, // Ensure it's on top
              },
              content: {
                width: "20%",
                height: "65%",
                margin:"auto",
                borderRadius: "10px",
                boxShadow: "1px 1px 10px gray",
                overflow: "hidden"
                
              },
            }}
          >
            <div className="my-3 w-full bg-red-80">
                <h1 className="pb-3">Name</h1>
                <input
                  className="border rounded-md p-2 w-full"
                  type="text"
                  name=""
                  id=""
                />
              </div>

            <div className="mb-2 w-full"> 
                <h1 className="pb-3">Email</h1>
                <input
                  className="border rounded-md p-2 w-full"
                  type="email"
                  name=""
                  id=""
                />
              </div>
            <div className=" flex flex-col gap-5">
              <div>
                <h1 className="pb-3">Contact Number</h1>
                <input
                  className="border rounded-md p-2 w-full"
                  type="number"
                  name=""
                  id=""
                />
              </div>
              
            

            
              <div>
                <h1 className="pb-3">Location</h1>
                <input
                  className="border rounded-md p-2 w-full"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              
              <button
                type="button"
                className="bg-blue-900 py-2 m-auto p-8 text-lg rounded-md text-white"
              >
                Add
              </button>
            </div>

            <button  onClick={() =>{setIsOpen(close)}}><MdCancel className="absolute top-3 right-3 size-5 hover:text-red-800" /> </button>
          </Model>

        </div>
      </div>
      

      <div className="table-container">
      <table className=" text-center mt-12 overflow-x-auto">
        <tr className="bg-blue-800 text-white h-12 ">
         

          <th className="border"> EntryCODE</th>
          <th className="border ">LINKTRY</th>
          <th className="border">CATCODE</th>
          <th className="border">STYPE</th>
          <th className="border">BUILTUP </th>
          <th className="border">CARPET </th>
          <th className="border">RATEBUY</th>
          <th className="border">RATELEASE</th>
          <th className="border">BUCRATIO</th>
          <th className="border">FLOOR</th>
          <th className="border">REMARKS</th>
          <th className="border">USERID</th>
          <th className="border">EDITDATE</th>
        </tr>

        <tr>
          
          <td className="py-4">Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
        </tr>

        <tr>
          
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
        </tr>

        <tr>
          
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
        </tr>

        <tr>
          
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
        </tr>

        <tr>
          
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
        </tr>

        <tr>
          
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
        </tr>

        <tr>
          
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
        </tr>

        <tr>
          
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
          <td>Cell text</td>
        </tr>
      </table>
      </div>
    </div>
  );
};

export default Client;
