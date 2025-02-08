import React from "react";
import { useState } from "react";
import PropertyForm from "./PropertyForm";


const Property = () => {

  const [showPropertyForm, setShowPropertyForm] = useState(false);
  return (
    <div className="mx-10 my-48">
      <div className="flex justify-between h-10 ">
        <div className="flex items-center gap-4 px-4 border border-gray-300 rounded-md py-7">
          <img
            className="object-none"
            src="/LeftColumn/search-normal.png"
            alt=""
          />{" "}
          <input className="outline-none" type="text" placeholder="Search" />
        </div>
        <div className="">
         
          <button
            type="button"
            
            className="px-10 py-2 text-xl text-white bg-blue-900 rounded-md"
            onClick={ () => setShowPropertyForm(true)}
          >
            Add
          </button>
         
          
        </div>
      </div>
      {showPropertyForm ? <PropertyForm setShowPropertyForm={setShowPropertyForm}/> : (
      <div className="table-container">
        <table className="mt-12 text-center ">
          <tr className="h-12 text-white bg-blue-800 ">
            <th className="border"> EntryCODE</th>
            <th className="border ">LINKTRY</th>
            <th className="border ">CATCODE</th>
            <th className="border ">STYPE</th>
            <th className="border ">BUILTUP </th>
            <th className="border ">CARPET </th>
            <th className="border ">RATEBUY</th>
            <th className="border ">RATELEASE</th>
            <th className="border ">BUCRATIO</th>
            <th className="border ">FLOOR</th>
            <th className="border ">REMARKS</th>
            <th className="border ">USERID</th>
            <th className="border ">EDITDATE</th>
          </tr>

          <tr>
            <td className="whitespace-nowrap">Cell text</td>
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
      </div>)}
    </div>
  );
};

export default Property;
