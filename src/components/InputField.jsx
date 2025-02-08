import React from "react";
import { useState } from "react";
import Model from "react-modal";
import { MdCancel } from "react-icons/md";
const InputField = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-48 mx-10">
    <div className="mt-7 table-container ">
      <div className="flex justify-between w-[70%] items-center ">
        

        <div className="shadow-xl  px-20 py-5">
          Property type
        </div>

        <div className="shadow-xl px-20 py-5">
            Description
        </div>

         
        <div>
        <button onClick={() => {setIsOpen(true)}} className=" shadow-md bg-blue-900 text-xl px-10 py-2 rounded-md text-white">
            Add
          </button>

          <Model isOpen={isOpen} style={{
            overlay:{
              backdropFilter: "blur(3px)",
              zIndex: 10
              
            },
            content:{
              width: "25%",
              height: "27%",
              margin: "auto",
              borderRadius: "10px",
              boxShadow: "1px 1px 10px gray",
              backgroundColor: "white",
              overflow: "visible"
              
            }

            
          }}>
            <div className="px-4  my-3">
            <h1>
              Name
            </h1>

            <input className="px-4 py-2 border-2 rounded-md my-2" type="text" name="" placeholder="Add Property Type" id="" />

            <button className="bg-blue-800 text-white block m-auto py-3 px-4 rounded-md mt-3" >Save</button>
            </div>
            <button  onClick={() =>{setIsOpen(close)}}><MdCancel className="absolute top-3 right-3 size-5 hover:text-red-800" /> </button>
          </Model>
        </div>

      </div>

      <table className="w-1/2 text-center mt-12">
        <tr className="bg-blue-800 text-white h-12 ">
          

          <th className="border"> ID</th>
          <th className="border ">Name</th>
          
        </tr>

        <tr className="p-4">
         
          <td className="p-4">Cell text</td>
          <td>Cell text</td>

        </tr>

        <tr>
         
          <td className="p-4">Cell text</td>
          <td>Cell text</td>

        </tr>

        <tr>
         
          <td className="p-4">Cell text</td>
          <td>Cell text</td>

        </tr>
        
        <tr>
         
          <td className="p-4">Cell text</td>
          <td>Cell text</td>

        </tr>

        <tr>
         
          <td className="p-4">Cell text</td>
          <td>Cell text</td>

        </tr>

        <tr>
         
          <td className="p-4">Cell text</td>
          <td>Cell text</td>

        </tr>

        <tr>
         
          <td className="p-4">Cell text</td>
          <td >Cell text</td>

        </tr>

        <tr>
         
          <td className="p-4">Cell text</td>
          <td>Cell text</td>

        </tr>

        <tr>
         
          <td className="p-4">Cell text</td>
          <td>Cell text</td>

        </tr>
        
      </table>
    </div>
    </div>
  );
};

export default InputField;
