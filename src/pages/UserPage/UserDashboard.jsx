
import  { useState, useEffect } from "react";
import axios from "../../helper/axios";
import Swal from "sweetalert2";
import UserSidebar from "./UserSidebar";
import SearchFilter from "../../components/SearchFilter";
import PropertyForm from "../../components/PropertyForm";

const UserDashboard = () => {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const [filteredPropertiesSidebar, setFilteredPropertiesSidebar] = useState(
    []
  );
  const [filter, setFilter] = useState(false);
  const [propertyTypeShow, setPropertyTypeShow] = useState(false);
  const [filterpropertyInput, setFilterPropertyInput] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const showFilter = () => {
    setFilter(!filter);
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/get_all_property_hierarchy/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      console.log(response.data);
      if (!response.data) throw new Error("No data received");

      const flattenedProperties = response.data.flatMap((city) =>
        city.sublocations.flatMap((sublocation) =>
          sublocation.areas.flatMap((area) =>
            area.properties.flatMap((property) =>
              property.property_details.map((detail) => ({
                project_name: property.project_name || "-",
                Pincode: property.pin || "-",
                company: property.company || "-",
                building: property.building || "-",
                address: property.address2 || "-",
                property_type: property.property_type || "-",
                status_code: property.status_code || "-",
                lease_type: property.lease_type || "-",
                floor: detail.floor || "-",
                wing: detail.wing || "-",
                car_parking: detail.car_parking || "-",
                unit_no: detail.unit_no || "-",
                rate_buy: detail.rate_buy || "-",
                rate_lease: detail.rate_lease || "-",
                builtup: detail.builtup || "-",
                carpet: detail.carpet || "-",
                remarks: detail.remarks || "-",
                area_name: area.area_name || "-",
                city_name: city.city_name || "-",
                c_status: property.c_status || "-",
                contact_person: detail.contacts?.[0]?.contact_person || "-",
                email: detail.contacts?.[0]?.email || "-",
                mobile: detail.contacts?.[0]?.mobile || "-",
                contact_person_address:
                  detail.contacts?.[0]?.contact_person_address || "-",
                // company: property.company || "-",
                description: property.description || "-",
                pin_code: property.pin || "-",
                usp: property.usp || "-",
              }))
            )
          )
        )
      );

      setProperties(flattenedProperties);
      setFilteredPropertiesSidebar(flattenedProperties); // Initialize with full data
      setLoading(false);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err.message || "Failed to fetch properties");
      setLoading(false);
    }
  };

  // const filteredProperties = (
  //   filteredPropertiesSidebar.length ? filteredPropertiesSidebar : properties
  // ).filter((property) =>
  //   Object.values(property || {}).some((value) =>
  //     String(value).toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );
  const filteredProperties = (
    filteredPropertiesSidebar.length ? filteredPropertiesSidebar : properties
  )
  .filter(property => 
    (selectedPropertyType === "" || property.property_type === selectedPropertyType) &&
    Object.values(property || {}).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  

  console.log(filteredProperties);
  console.log(filteredProperties.property_type);

  const showContactDetails = (property) => {
    console.log(property);
    Swal.fire({
      title: `<h2 style="color: #2c3e50; font-weight: 600;">${property.project_name} - Details</h2>`,
      html: `
      <div style="text-align: left; font-size: 16px; color: #2c3e50; line-height: 1.6;">
        <p><strong>Company:</strong> ${property.company}</p>
        <p><strong>Remarks:</strong> ${property.remarks}</p>
        <p><strong>Floor:</strong> ${property.floor}</p>
        <p><strong>Unit NO.:</strong> ${property.unit_no}</p>
        <p><strong>Wing:</strong> ${property.wing}</p>
        <p><strong>Car Parking:</strong> ${property.car_parking}</p>
        <p><strong>Builtup Area:</strong> ${property.builtup}</p>
        <p><strong>Carpet Area:</strong> ${property.carpet}</p>
        <hr style="border-top: 1px solid #dcdcdc; margin: 10px 0;"/>
        <p><strong>Contact Person:</strong> ${property.contact_person}</p>
        <p><strong>Email:</strong> <a href="mailto:${property.email}" style="color: #2c3e50; text-decoration: none;">${property.email}</a></p>
        <p><strong>Mobile:</strong> <a href="tel:${property.mobile}" style="color: #2c3e50; text-decoration: none;">${property.mobile}</a></p>
        <p><strong>Address:</strong> ${property.contact_person_address}</p>
      </div>`,
      confirmButtonText: "Close",
      width: "500px",
      background: "#ffffff",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <UserSidebar
        properties={properties}
        setFilteredPropertiesSidebar={setFilteredPropertiesSidebar} // Pass setter function
      />
      <div className="w-[75%] overflow-y-scroll">
        <div className="pb-20 mx-10 my-24 ">

          <div className='flex gap-8 -mt-14 '>
            <button className='text-xl text-gray-400 hover:text-blue-900 hover:border-b-2  border-blue-900'>Properties</button>
            <button className='text-xl text-gray-400 hover:text-blue-900 hover:border-blue-900 hover:border-b-2 '>Clients</button>
          </div>

          <div className="flex justify-between w-full py-6">
            <div className="w-[100%] flex gap-2">
              {/* <select
                className="border border-gray-300 rounded p-3 w-[20%]"
                defaultValue="Property Type"
              >
               <option disabled>Property Type</option>

                {
                
                }
              </select> */}
              <select
  className="border border-gray-300 rounded p-3 w-[20%]"
  value={selectedPropertyType}
  onChange={(e) => setSelectedPropertyType(e.target.value)}
>
  <option value="">All Property Types</option>
  {[...new Set(properties.map((p) => p.property_type))].map((type) => (
    <option key={type} value={type}>{type}</option>
  ))}
</select>
              <label className=" border border-gray-300 text-gray-400 rounded p-3 ml-6 w-[20%]">
                <option>Location</option>
              </label>
              <div className="relative right-14 top-1 cursor-pointer w-full">
                <div onClick={showFilter}>
                  <img src="/LeftColumn/Filter.png" alt="" />
                </div>
                {filter && (
                  <SearchFilter
                    propertyTypeShow={propertyTypeShow}
                    setPropertyTypeShow={setPropertyTypeShow}
                    filterpropertyInput={filterpropertyInput}
                    setFilterPropertyInput={setFilterPropertyInput}
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type="button"
                className="px-10 py-2 text-xl text-white bg-blue-900 rounded-md hover:bg-blue-800"
                onClick={() => setShowPropertyForm(true)}
              >
                Add
              </button>
            </div>
          </div>

          {showPropertyForm ? (
            <PropertyForm
              setShowPropertyForm={setShowPropertyForm}
              onSubmit={fetchProperties}
            />
          ) : (
            <div className="overflow-x-auto">
              {loading ? (
                <div className="mt-8 text-center">Loading properties...</div>
              ) : filteredProperties.length === 0 ? (
                <div className="mt-8 text-center">No properties found</div>
              ) : (
                <table className="w-full mt-12 min-w-max">
                  <thead>
                    <tr className="h-12 text-white bg-blue-800">
                      <th className="px-4 border">Project Name</th>
                      <th className="px-4 border">Building</th>
                      <th className="px-4 border">Address1</th>
                      <th className="px-4 border">City</th>
                      <th className="px-4 border">Area</th>
                      <th className="px-4 border">Property Type</th>
                      <th className="px-4 border">lease_type</th>
                      <th className="px-4 border">C Status</th>
                      <th className="px-4 border">Contact person</th>
                      <th className="px-4 border">Buy rate</th>
                      <th className="px-4 border">lease rate</th>
                      <th className="px-4 border">Company</th>
                      <th className="px-4 border">Description</th>
                      <th className="px-4 border">Pincode</th>
                      <th className="px-4 border">USP</th>
                      <th className="px-4 border">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProperties.map((property, index) => (
                      <tr
                        key={index}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => showContactDetails(property)}
                      >
                        <td className="px-4 py-2 border text-wrap">
                          {property.project_name}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.building}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.address}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.city_name}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.area_name}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.property_type}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.lease_type}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.c_status}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.contact_person}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.rate_buy}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.rate_lease}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.company}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.description}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.pin_code}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.usp}
                        </td>
                        <td className="px-4 py-2 border text-wrap">
                          {property.status_code}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
