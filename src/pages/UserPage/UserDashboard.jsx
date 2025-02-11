import React, { useState, useEffect } from "react";
import axios from "../../helper/axios";
import Swal from "sweetalert2";
import UserSidebar from "./UserSidebar";

const UserDashboard = () => {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/get_all_property_hierarchy/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data) throw new Error("No data received");

      const flattenedProperties = response.data.flatMap((city) =>
        city.sublocations.flatMap((sublocation) =>
          sublocation.areas.flatMap((area) =>
            area.properties.flatMap((property) =>
              property.property_details.map((detail) => ({
                project_name: property.project_name || "-",
                building: property.building || "-",
                address: property.address2 || "-",
                property_type: property.property_type || "-",
                status_code: property.status_code || "-",
                lease_type: property.lease_type || "-",
                floor: detail.floor || "-",
                unit_no: detail.unit_no || "-",
                rate_buy: detail.rate_buy || "-",
                rate_lease: detail.rate_lease || "-",
                remarks: detail.remarks || "-",
                area_name: area.area_name || "-",
                city_name: city.city_name || "-",
              }))
            )
          )
        )
      );

      setProperties(flattenedProperties);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err.message || "Failed to fetch properties");
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) =>
    Object.values(property).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const showPropertyDetails = (property) => {
    Swal.fire({
      title: `<h2 style="color: #2c3e50; font-weight: 600;">${property.project_name} - Details</h2>`,
      html: `
        <div style="text-align: left; font-size: 16px; color: #2c3e50; line-height: 1.6;">
          <p><strong>Building:</strong> ${property.building}</p>
          <p><strong>City:</strong> ${property.city_name}</p>
          <p><strong>Area:</strong> ${property.area_name}</p>
          <p><strong>Property Type:</strong> ${property.property_type}</p>
          <p><strong>Status:</strong> ${property.status_code}</p>
          <p><strong>Floor:</strong> ${property.floor}</p>
          <p><strong>Unit:</strong> ${property.unit_no}</p>
          <p><strong>Buy Rate:</strong> ${property.rate_buy}</p>
          <p><strong>Lease Rate:</strong> ${property.rate_lease}</p>
          <p><strong>Remarks:</strong> ${property.remarks}</p>
        </div>`,
      confirmButtonText: "Close",
      width: "500px",
      background: "#ffffff",
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <UserSidebar />
      
      <div className="flex flex-col flex-1 p-6 w-[75%]">
      <div className="flex justify-between w-full py-7 px-7">
          <div className="w-[100%]">
            <select
              className="border border-gray-300 rounded p-3 ml-6 w-[20%]"
              defaultValue="Property Type"
            >
              <option disabled>Property Type</option>
              <option>Commercial</option>
              <option>Office spaces</option>
            </select>

            <select className="border border-gray-300 text-gray-400 rounded p-3 ml-6 w-[20%]">
              <option>Location</option>
            </select>
          </div>

          <button className="px-10 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700">
            Add
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex items-center w-1/3 px-4 py-2 border border-gray-300 rounded-md">
            <img className="mr-2" src="/LeftColumn/search-normal.png" alt="search" />
            <input
              className="w-full outline-none"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="p-4 overflow-x-auto bg-white rounded-lg shadow-md">
          {loading ? (
            <div className="text-center">Loading properties...</div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center">No properties found</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-white bg-blue-800">
                  {["Project Name", "Building", "City", "Area", "Property Type", "Status", "Floor", "Unit", "Buy Rate", "Lease Rate", "Remarks"].map((heading) => (
                    <th key={heading} className="px-4 py-2 border">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => showPropertyDetails(property)}
                  >
                    {Object.values(property).slice(0, 11).map((value, i) => (
                      <td key={i} className="px-4 py-2 border text-wrap">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
