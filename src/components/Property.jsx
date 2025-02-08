import React, { useState, useEffect } from "react";
import PropertyForm from "./PropertyForm";
import axios from "../helper/axios";
import Swal from "sweetalert2";

const Property = () => {
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
      const response = await axios.get('/api/get_all_property_hierarchy/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
      console.log(response.data)
      if (!response.data) throw new Error('No data received');
      
      const flattenedProperties = response.data.flatMap(city => 
        city.sublocations.flatMap(sublocation =>
          sublocation.areas.flatMap(area =>
            area.properties.flatMap(property =>
              property.property_details.map(detail => ({
                project_name: property.project_name || '-',
                building: property.building || '-',
                address: property.address2 || '-',
                property_type: property.property_type || '-',
                status_code: property.status_code || '-',
                lease_type: property.lease_type || '-',
                floor: detail.floor || '-',
                unit_no: detail.unit_no || '-',
                rate_buy: detail.rate_buy || '-',
                rate_lease: detail.rate_lease || '-',
                remarks: detail.remarks || '-',
                area_name: area.area_name || '-',
                city_name: city.city_name || '-',
                contact_person: detail.contacts?.[0]?.contact_person || '-',
                email: detail.contacts?.[0]?.email || '-',
                mobile: detail.contacts?.[0]?.mobile || '-',
                contact_person_address: detail.contacts?.[0]?.contact_person_address || '-',
                company: property.company || '-',
                description: property.description || '-',
                pin_code: property.pin || '-',
                usp: property.usp || '-'
              }))
            )
          )
        )
      );
      
      setProperties(flattenedProperties);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err.message || 'Failed to fetch properties');
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property =>
    Object.values(property).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  console.log(filteredProperties);

  const showContactDetails = (property) => {
    console.log(property);
    Swal.fire({
      title: `<h2 style="color: #2c3e50; font-weight: 600;">${property.project_name} - Details</h2>`,
      html: `
        <div style="text-align: left; font-size: 16px; color: #2c3e50; line-height: 1.6;">
          <p><strong>Company:</strong> ${property.company}</p>
          <p><strong>Description:</strong> ${property.description}</p>
          <p><strong>Pin Code:</strong> ${property.pin_code}</p>
          <p><strong>Status:</strong> ${property.status_code}</p>
          <p><strong>USP:</strong> ${property.usp}</p>
          <hr style="border-top: 1px solid #dcdcdc; margin: 10px 0;"/>
          <p><strong>Contact Person:</strong> ${property.contact_person}</p>
          <p><strong>Email:</strong> <a href="mailto:${property.email}" style="color: #2c3e50; text-decoration: none;">${property.email}</a></p>
          <p><strong>Mobile:</strong> <a href="tel:${property.mobile}" style="color: #2c3e50; text-decoration: none;">${property.mobile}</a></p>
          <p><strong>Address:</strong> ${property.contact_person_address}</p>
        </div>`,
      
      confirmButtonText: 'Close',
      width: '500px',
      background: '#ffffff',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };


  

  return (
    <div className="mx-10 my-24">
      <div className="flex justify-between h-10">
        <div className="flex items-center gap-4 px-4 border border-gray-300 rounded-md py-7">
          <img className="object-none" src="/LeftColumn/search-normal.png" alt="search" />
          <input 
            className="outline-none" 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button
            type="button"
            className="px-10 py-2 text-xl text-white bg-blue-900 rounded-md"
            onClick={() => setShowPropertyForm(true)}
          >
            Add
          </button>
        </div>
      </div>

      {showPropertyForm ? (
        <PropertyForm setShowPropertyForm={setShowPropertyForm} onSubmit={fetchProperties} />
      ) : (
        <div className="overflow-x-auto">
          {loading ? (
            <div className="mt-8 text-center">Loading properties...</div>
          ) : error ? (
            <div className="mt-8 text-center text-red-500">{error}</div>
          ) : filteredProperties.length === 0 ? (
            <div className="mt-8 text-center">No properties found</div>
          ) : (
            <table className="w-full mt-12 min-w-max">
              <thead>
                <tr className="h-12 text-white bg-blue-800">
                  <th className="px-4 border">Project Name</th>
                  <th className="px-4 border">Building</th>
                  <th className="px-4 border">City</th>
                  <th className="px-4 border">Area</th>
                  <th className="px-4 border">Property Type</th>
                  <th className="px-4 border">Status</th>
                  <th className="px-4 border">Floor</th>
                  <th className="px-4 border">Unit</th>
                  <th className="px-4 border">Buy Rate</th>
                  <th className="px-4 border">Lease Rate</th>
                  <th className="px-4 border">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property, index) => (
                  <tr key={index} className="cursor-pointer hover:bg-gray-50" onClick={() => showContactDetails(property)}>
                    <td className="px-4 py-2 border text-wrap">{property.project_name}</td>
                    <td className="px-4 py-2 border text-wrap">{property.building}</td>
                    <td className="px-4 py-2 border text-wrap">{property.city_name}</td>
                    <td className="px-4 py-2 border text-wrap">{property.area_name}</td>
                    <td className="px-4 py-2 border text-wrap">{property.property_type}</td>
                    <td className="px-4 py-2 border text-wrap">{property.status_code}</td>
                    <td className="px-4 py-2 border text-wrap">{property.floor}</td>
                    <td className="px-4 py-2 border text-wrap">{property.unit_no}</td>
                    <td className="px-4 py-2 border text-wrap">{property.rate_buy}</td>
                    <td className="px-4 py-2 border text-wrap">{property.rate_lease}</td>
                    <td className="px-4 py-2 border text-wrap">{property.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Property;
