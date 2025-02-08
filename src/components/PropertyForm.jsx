import React, { useState } from "react";
import PropertyTypeDropdown from "./PropertyTypeDropdown";
import ReopenDateDropdown from "./ReopenDateDropdown";
import { MdCancel } from "react-icons/md";
import axios from "../helper/axios";

const PropertyForm = ({ setShowPropertyForm }) => {
  const tabs = ["addProperty", "areaDetails", "contact"];
  const [activeTab, setActiveTab] = useState(0);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    city_name: "",
    sublocations: [{
      sublocation_name: "",
      areas: [{
        area_name: "",
        properties: [{
          project_name: "",
          building: "",
          address2: "",
          description: "",
          area: "",
          pin: "",
          company: "",
          status_code: "",
          property_type: "",
          c_status: "",
          lease_type: "",
          usp: "",
          property_details: [{
            floor: 0,
            unit_no: "",
            wing: "",
            car_parking: "",
            rate_buy: 0,
            rate_lease: 0,
            remarks: "",
            contacts: [{
              contact_person: "",
              email: "",
              mobile: "",
              contact_person_address: ""
            }]
          }]
        }]
      }]
    }]
  });

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    
    if (section === "property") {
      setFormData(prev => ({
        ...prev,
        ...(name === 'city_name' ? { city_name: value } : {}),
        sublocations: [{
          ...prev.sublocations[0],
          ...(name === 'sublocation_name' ? { sublocation_name: value } : {}),
          areas: [{
            ...prev.sublocations[0].areas[0],
            ...(name === 'area_name' ? { area_name: value } : {}),
            properties: [{
              ...prev.sublocations[0].areas[0].properties[0],
              [name]: value
            }]
          }]
        }]
      }));
    } else if (section === "propertyDetails") {
      setFormData(prev => ({
        ...prev,
        sublocations: [{
          ...prev.sublocations[0],
          areas: [{
            ...prev.sublocations[0].areas[0],
            properties: [{
              ...prev.sublocations[0].areas[0].properties[0],
              property_details: [{
                ...prev.sublocations[0].areas[0].properties[0].property_details[0],
                [name]: value
              }]
            }]
          }]
        }]
      }));
    } else if (section === "contact") {
      setFormData(prev => ({
        ...prev,
        sublocations: [{
          ...prev.sublocations[0],
          areas: [{
            ...prev.sublocations[0].areas[0],
            properties: [{
              ...prev.sublocations[0].areas[0].properties[0],
              property_details: [{
                ...prev.sublocations[0].areas[0].properties[0].property_details[0],
                contacts: [{
                  ...prev.sublocations[0].areas[0].properties[0].property_details[0].contacts[0],
                  [name]: value
                }]
              }]
            }]
          }]
        }]
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/add_property_details_with_hierarchy/', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        console.log('Success:', response.data);
        setShowPropertyForm(false);
      } else {
        throw new Error('Failed to submit property details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative p-8 mx-auto mt-16 bg-white border rounded-lg shadow-inner shadow-black">
      <button
        onClick={() => setShowPropertyForm(false)}
        className="absolute top-2 right-2"
      >
        <MdCancel className="text-xl text-gray-500 hover:text-red-600" />
      </button>

      <div className="flex border-b pb-7">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 py-3 font-semibold rounded-md ${index !== tabs.length - 1 ? 'border-r-2' : ''} ${
              activeTab === index ? "text-white bg-blue-900" : "hover:text-blue-700"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.replace(/([A-Z])/g, " $1").trim()}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <form className="grid grid-cols-2 gap-10 mt-6 mx-auto w-[80%]">
          <div className="space-y-4">
            <label className="block font-medium">Project Name</label>
            <input
              type="text"
              name="project_name"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
            <label className="block font-medium">Building Name</label>
            <input
              type="text"
              name="building"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
            <label className="block mt-4 font-medium">Sub Location</label>
            <input
              type="text"
              name="sublocation_name"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
            <label className="block mt-4 font-medium">Area Name</label>
            <input
              type="text"
              name="area_name"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
            <label className="block mt-4 font-medium">City</label>
            <input
              type="text"
              name="city_name"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
            <label className="block mt-4 font-medium">PIN Code</label>
            <input
              type="text"
              name="pin"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
          </div>

          <div className="space-y-4">
            <label className="block font-medium">Full Address</label>
            <input
              type="text"
              name="address2"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
            <PropertyTypeDropdown 
              onChange={(value) => handleInputChange({ target: { name: 'property_type', value }}, "property")}
            />
            <label className="block mt-4 font-medium">Current Status</label>
            <input
              type="text"
              name="c_status"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
            <label className="block mt-4 font-medium">Status Code</label>
            <input
              type="text"
              name="status_code"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
            <label className="block mt-4 font-medium">Lease Type</label>
            <input
              type="text"
              name="lease_type"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
          </div>

          <div className="col-span-2 space-y-4">
            <label className="block font-medium">USP (Unique Selling Point)</label>
            <input
              type="text"
              name="usp"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "property")}
            />
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              className="w-full p-3 border rounded-lg shadow-sm"
              rows="3"
              onChange={(e) => handleInputChange(e, "property")}
            ></textarea>
          </div>
        </form>
      )}

      {activeTab === 1 && (
        <form className="grid grid-cols-2 gap-6 mt-6 mx-auto w-[80%]">
          <div className="space-y-4">
            <label className="block font-medium">Built-up Area</label>
            <input
              type="text"
              name="area"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "propertyDetails")}
            />
            <label className="block mt-4 font-medium">Car Parking</label>
            <input
              type="text"
              name="car_parking"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "propertyDetails")}
            />
            <label className="block mt-4 font-medium">Rate (Buy)</label>
            <input
              type="number"
              name="rate_buy"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "propertyDetails")}
            />
            <label className="block mt-4 font-medium">Unit No</label>
            <input
              type="text"
              name="unit_no"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "propertyDetails")}
            />
          </div>

          <div className="space-y-4">
            <label className="block font-medium">Wing</label>
            <input
              type="text"
              name="wing"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "propertyDetails")}
            />
            <label className="block mt-4 font-medium">Floor</label>
            <input
              type="number"
              name="floor"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "propertyDetails")}
            />
            <label className="block mt-4 font-medium">Rate (Lease)</label>
            <input
              type="number"
              name="rate_lease"
              className="w-full p-3 border rounded-lg shadow-sm"
              onChange={(e) => handleInputChange(e, "propertyDetails")}
            />
            <label className="block mt-4 font-medium">Remarks</label>
            <textarea
              name="remarks"
              className="w-full p-3 border rounded-lg shadow-sm"
              rows="3"
              onChange={(e) => handleInputChange(e, "propertyDetails")}
            ></textarea>
          </div>
        </form>
      )}

      {activeTab === 2 && (
        <div className="w-[80%] mx-auto mt-6">
          <form className="grid grid-cols-2 gap-8">
            <div>
              <label className="block font-medium">Company / Builder</label>
              <input
                type="text"
                name="company"
                className="w-full p-3 mt-2 border rounded-md"
                onChange={(e) => handleInputChange(e, "property")}
              />

              <label className="block mt-6 font-medium">Contact Person Name</label>
              <input
                type="text"
                name="contact_person"
                className="w-full p-3 mt-2 border rounded-md"
                onChange={(e) => handleInputChange(e, "contact")}
              />

              <label className="block mt-6 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 mt-2 border rounded-md"
                onChange={(e) => handleInputChange(e, "contact")}
              />
            </div>

            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                name="contact_person_address"
                className="w-full p-3 mt-2 border rounded-md"
                onChange={(e) => handleInputChange(e, "contact")}
              />

              <label className="block mt-6 font-medium">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                className="w-full p-3 mt-2 border rounded-md"
                onChange={(e) => handleInputChange(e, "contact")}
              />
            </div>
          </form>
        </div>
      )}

      <div className="flex justify-center gap-6 mt-8">
        {activeTab > 0 && (
          <button 
            className="px-6 py-3 text-white bg-gray-400 rounded-lg hover:bg-gray-500"
            onClick={() => setActiveTab(activeTab - 1)}
          >
            Previous
          </button>
        )}
        {activeTab < tabs.length - 1 ? (
          <button 
            className="px-6 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
            onClick={() => setActiveTab(activeTab + 1)}
          >
            Next
          </button>
        ) : (
          <button 
            className="px-6 py-3 text-white bg-green-700 rounded-lg hover:bg-green-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyForm;