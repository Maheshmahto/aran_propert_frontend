import React from "react";
import UserSidebar from "./UserSidebar"; // Adjust the import if the path is different

const UserDashboard = () => {
  return (
    <div className="w-full flex">
      {/* Sidebar Section - If you want the sidebar to be part of the user dashboard */}
      <UserSidebar />

      <div className="w-full">
        {/* Filters Section */}
        <div className="w-full py-7 px-7 flex justify-between">
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

          <button className="bg-blue-500 text-white px-10 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
            Add
          </button>
        </div>

        {/*  It is a table Section */}
        <div className="p-3">
          {/* To fixed height and overflow for table scrolling */}
          <div
            className="overflow-x-auto max-w-full"
            style={{ maxHeight: "calc(100vh - 200px)" }} //to adjust height of the slide
          >
            <div
              className="max-full"
              style={{ maxWidth: "calc(100vh - 200px)" }} //to adjust height of the slide
            >
              <table className="min-w-full text-sm text-left text-gray-500 bg-white border-collapse">
                <thead className="text-xs uppercase bg-blue-800 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <input type="checkbox" className="w-4 h-4" />
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ENTRYCODE
                    </th>
                    <th scope="col" className="px-6 py-3">
                      LINKTRY
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CATCODE
                    </th>
                    <th scope="col" className="px-6 py-3">
                      STYPE
                    </th>
                    <th scope="col" className="px-6 py-3">
                      BUILTUP
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CARPET
                    </th>
                    <th scope="col" className="px-6 py-3">
                      RATEBUY
                    </th>
                    <th scope="col" className="px-6 py-3">
                      RATELEASE
                    </th>
                    <th scope="col" className="px-6 py-3">
                      BUCRATIO
                    </th>
                    <th scope="col" className="px-6 py-3">
                      FLOOR
                    </th>
                    <th scope="col" className="px-6 py-3">
                      REMARKS
                    </th>
                    <th scope="col" className="px-6 py-3">
                      USERID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      EDITDATE
                    </th>
                    <th scope="col" className="px-6 py-3">
                      WING
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CARPARKIN
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 14 }).map((_, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 ${"bg-white"} border-b`}
                    >
                      <td className="px-6 py-4">
                        <input type="checkbox" className="w-4 h-4" />
                      </td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                      <td className="px-6 py-4">Cell text</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
