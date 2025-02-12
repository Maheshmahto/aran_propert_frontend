import "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { ResponsiveChartContainer, BarPlot } from "@mui/x-charts";

import axios from "../../helper/axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/get_all_users");
      console.log(response.data);
      setData(response.data.data);
    } catch (e) {
      console.error("Error fetching users:", e);
    }
  };
  const [clientCount, setClientCount] = useState("");
  const FetchClint = async () => {
    try {
      const response = await axios.get("/api/clients");
      console.log(response.data.length);
      setClientCount(response.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  const [PropertyCnt, setPropertycnt] = useState("");
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const parsedToken = JSON.parse(user);
      var token = parsedToken.token;
    } catch (e) {
      console.log("error pasiing token :", e);
    }
  } else {
    console.log("no token found in localstorage");
  }
  const fetchProperty = async () => {
    try {
      const response = await axios.get("/api/get_all_property_hierarchy", {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });
      console.log(response.data.length);
      setPropertycnt(response.data.length);
      console.log(response.headers.content - length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProperty();
    FetchClint();
  }, []);

  useEffect(() => {
    const CountUser = () => {
      let userCount = 0;

      for (let i = 0; i < data.length; i++) {
        if (data[i].user_type === "user") {
          userCount++;
        }
      }
      setCount(userCount);
    };

    if (data.length > 0) {
      CountUser();
    }
  }, [data]);

  return (
    <>
      <div className="flex m-8 mt-32 justify-evenly">
        <div className="flex items-center text-gray-600 shadow-lg gap-7 pl-7 w-60 h-50">
          <div className="p-2 bg-green-100 border rounded-full">
            <img
              className="w-12"
              src="/LeftColumn/real-estate (1) 1.png"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{PropertyCnt}</h1>
            <h1 className="text-2xl">Property</h1>
          </div>
        </div>

        <div className="flex items-center text-gray-600 shadow-lg gap-7 pl-7 w-60 h-36">
          <div className="p-2 bg-pink-100 border rounded-full">
            <img className="w-12" src="/LeftColumn/Rectangle (2).png" alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{count}</h1>
            <h1 className="text-2xl">User</h1>
          </div>
        </div>

        <div className="flex items-center text-gray-600 shadow-lg gap-7 pl-7 w-60 h-36">
          <div className="p-2 bg-pink-100 border rounded-full">
            <img className="w-12" src="/LeftColumn/accountant 1.png" alt="" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{clientCount}</h1>
            <h1 className="text-2xl">Client</h1>
          </div>
        </div>
      </div>

      <div className="mx-[25%] mt-10 ">
        <BarChart
          xAxis={[{ scaleType: "band", data: [""] }]}
          series={[
            // { data: [PropertyCnt, count] },
            { data: [PropertyCnt], label: "Properties", color: "#00bcd4" },
            { data: [count], label: "Users", color: "#2196f3" },
            { data: [clientCount], label: "Client", color: "pink" },
          ]}
          width={500}
          height={450}
        />
      </div>
    </>
  );
};

export default Dashboard;
