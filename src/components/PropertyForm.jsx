import React, { useState } from "react";
import PropertyTypeDropdown from "./PropertyTypeDropdown"; // Import the dropdown component
import ReopenDateDropdown from "./ReopenDateDropdown";
import { MdCancel } from "react-icons/md";

const PropertyForm = ({ setShowPropertyForm }) => {
  const [activeTab, setActiveTab] = useState("addProperty");

  return (
    <>
      <div className=" shadow-inner shadow-black mx-auto mt-16 p-8 bg-white  border rounded-lg relative">
     
     <button
       onClick={() => {
         setShowPropertyForm(false);
       }}
       className="absolute top-2 right-2"
     >
       <MdCancel className="text-gray-500 hover:text-red-600 text-xl" />
     </button>
     {/* Navigation Tabs */}
     <div className="flex border-b pb-7 ">
        
       <button
         className={`flex-1 py-3 font-semibold rounded-md border-r-2 ${
           activeTab === "addProperty"
             ? "text-white bg-blue-900"
             : "hover:text-blue-700"
         }`}
         onClick={() => setActiveTab("addProperty")}
       >
         Add Property
       </button>
       <button
         className={`flex-1 py-3 font-semibold rounded-md border-r-2 ${
           activeTab === "areaDetails"
             ? "text-white bg-blue-900"
             : "hover:text-blue-700"
         }`}
         onClick={() => setActiveTab("areaDetails")}
       >
         Area Details
       </button>
       <button
         className={`flex-1 py-3 font-semibold rounded-md ${
           activeTab === "contact"
             ? "text-white bg-blue-900"
             : "hover:text-blue-700"
         }`}
         onClick={() => setActiveTab("contact")}
       >
         Contact
       </button>
     </div>

     {/* Form Section */}
     {activeTab === "addProperty" && (
       <form className="grid grid-cols-2 gap-10 mt-6 mx-auto w-[80%]">
         {/* Left Column */}
         <div className="space-y-4">
           <label className="block font-medium text">Building Name</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
           <label className="block mt-4 font-medium">Sub Location</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
           <label className="block mt-4 font-medium">City</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
           <ReopenDateDropdown/>
           <label className="block mt-4 font-medium">Poss. Status</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
         </div>

         {/* Right Column */}
         <div className="space-y-4">
           <label className="block font-medium">Full Address</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />

           {/* Use PropertyTypeDropdown here */}
           <PropertyTypeDropdown />

           <label className="block mt-4 font-medium">LL / Outright</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
           <label className="block mt-4 font-medium">Location</label>
           <div className="flex items-center gap-3">
             <input
               type="text"
               className="w-full p-3 border rounded-lg shadow-sm "
             />
           </div>

           <div className="flex gap-3 items-center">
             <label className="flex">
               <input
                 type="checkbox"
                 className="form-checkbox accent-blue-900 h-5 w-5"
                 checked
               />
               <span className="ml-2">East</span>
             </label>
             <label className="flex">
               <input
                 type="checkbox"
                 className="form-checkbox text-gray-500 accent-blue-900 h-5 w-5"
               />
               <span className="ml-2">West</span>
             </label>
           </div>
         </div>

         <div className="col-span-2">
           <label className="font-medium">Description</label>
           <textarea
             className="p-3 mt-4 w-full border rounded-lg shadow-sm "
             rows="3"
           ></textarea>
         </div>
       </form>
     )}

     {activeTab === "areaDetails" && (
       <form className="grid grid-cols-2 gap-6 mt-6 mx-auto w-[80%]">
         {/* Left Column */}
         <div className="space-y-4">
           <label className="block  font-medium">Built-up Area</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
           <label className="block mt-4  font-medium">Efficiency</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
           <label className="block mt-4  font-medium">Rental psf</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
           <label className="block mt-4  font-medium">Unit No</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
         </div>

         {/* Right Column */}
         <div className="space-y-4">
           <label className="block  font-medium">Carpet Area</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
           <label className="block mt-4  font-medium">Car Parking</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
           <label className="block mt-4  font-medium">Outright Rate psf</label>
           <input
             type="text"
             className="w-full p-3 border  rounded-lg shadow-sm "
           />
           <label className="block mt-4  font-medium">Floor & Wing</label>
           <input
             type="text"
             className="w-full p-3 border rounded-lg shadow-sm "
           />
         </div>
       </form>
     )}

     {activeTab === "contact" && (
       <div className="w-[80%] mx-auto mt-6">
         <form className="grid grid-cols-2 gap-8">
           {/* Left Column */}
           <div>
             <label className="block  font-medium">
               Company / Builder
             </label>
             <input
               type="text"
               className="w-full p-3 border rounded-md mt-2"
             />

             <label className="block  font-medium mt-6">
               Contact Person 1 Name
             </label>
             <input
               type="text"
               className="w-full p-3 border rounded-md mt-2"
             />

             <label className="block  font-medium mt-6">
               Contact Person 2 Name
             </label>
             <input
               type="text"
               className="w-full p-3 border rounded-md mt-2"
             />

             <label className="block  font-medium mt-6">
               Email
             </label>
             <input
               type="email"
               className="w-full p-3 border rounded-md mt-2"
             />
           </div>

           {/* Right Column */}
           <div>
             <label className="block  font-medium">Address</label>
             <input
               type="text"
               className="w-full p-3 border rounded-md mt-2"
             />

             <label className="block  font-medium mt-6">
               Contact Person 1 Mobile Number
             </label>
             <input
               type="text"
               className="w-full p-3 border rounded-md mt-2"
             />

             <label className="block  font-medium mt-6">
               Contact Person 2 Mobile Number
             </label>
             <input
               type="text"
               className="w-full p-3 border rounded-md mt-2"
             />

             <label className="block  font-medium mt-6">
               Referred By
             </label>
             <input
               type="text"
               className="w-full p-3 border rounded-md mt-2"
             />
           </div>
         </form>
       </div>
     )}

     {/* Buttons */}
     <div className="flex justify-center gap-6 mt-8">
       <button className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-all">
         Edit
       </button>
       {activeTab !== "contact" && (
         <button className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-all">
           Add
         </button>
       )}
       <button className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-all">
         Save
       </button>
     </div>
   </div>
    </>
  );
};

export default PropertyForm;
