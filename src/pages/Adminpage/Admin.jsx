import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "../../helper/axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/get_all_users");
      setData(response.data.data);
    } catch (e) {
      console.error("Error fetching users:", e);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get("/api/clients");
      setClientCount(response.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProperty = async () => {
    try {
      const response = await axios.get("/api/get_all_property_hierarchy");
  
      let totalProperties = 0;
  
      response.data.forEach((city) => {
        city.sublocations.forEach((sublocation) => {
          sublocation.areas.forEach((area) => {
            const validProperties = area.properties.filter(
              (property) => property.property_code // Count only properties with a valid `property_code`
            );
            totalProperties += validProperties.length;
          });
        });
      });
  
      console.log("Total properties counted (with property_code):", totalProperties);
      setPropertyCount(totalProperties);
    } catch (e) {
      console.error("Error fetching properties:", e);
    }
  };
  

  useEffect(() => {
    fetchUsers();
    fetchProperty();
    fetchClients();
  }, []);

  useEffect(() => {
    const countUsers = () => {
      let userCount = data.filter((user) => user.user_type === "user").length;
      setCount(userCount);
    };

    if (data.length > 0) {
      countUsers();
    }
  }, [data]);

  return (
    <>
      <div className="flex m-8 mt-32 justify-evenly">
        <div className="flex items-center text-gray-600 shadow-lg gap-7 pl-7 w-60 h-50">
          <div className="p-2 bg-green-100 border rounded-full">
            <img className="w-12" src="./LeftColumn/real-estate (1) 1.png" alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{propertyCount}</h1>
            <h1 className="text-2xl">Properties</h1>
          </div>
        </div>

        <div className="flex items-center text-gray-600 shadow-lg gap-7 pl-7 w-60 h-36">
          <div className="p-2 bg-pink-100 border rounded-full">
            <img className="w-12" src="./LeftColumn/Rectangle (2).png" alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{count}</h1>
            <h1 className="text-2xl">Users</h1>
          </div>
        </div>

        <div className="flex items-center text-gray-600 shadow-lg gap-7 pl-7 w-60 h-36">
          <div className="p-2 bg-pink-100 border rounded-full">
            <img className="w-12" src="./LeftColumn/accountant 1.png" alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{clientCount}</h1>
            <h1 className="text-2xl">Clients</h1>
          </div>
        </div>
      </div>

      <div className="mx-[25%] mt-10">
        <BarChart
          xAxis={[{ scaleType: "band", data: [""] }]}
          series={[
            { data: [propertyCount], label: "Properties", color: "#00bcd4" },
            { data: [count], label: "Users", color: "#2196f3" },
            { data: [clientCount], label: "Clients", color: "pink" },
          ]}
          width={500}
          height={450}
        />
      </div>
    </>
  );
};

export default Dashboard;
