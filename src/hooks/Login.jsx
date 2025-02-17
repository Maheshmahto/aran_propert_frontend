import axios from "../helper/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./LoginContext"; // Login Context
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useLogin(); // Get dispatch from Login Context

  const [inputData, setInputData] = useState({ email: "", user_password: "" });

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/AriyanspropertiesUsers/login/",
        inputData
      );
      // Extract user and token from response
      const user_data = response.data;
      const { token: newToken, ...user } = response.data;

          // Check if token exists
    if (!newToken) {
      // If no token is present, show an error and return
      throw new Error("Token missing. Login failed.");
    }

      // Save user and token to localStorage
      localStorage.setItem("user", JSON.stringify(user_data));
      localStorage.setItem("token", newToken);
      console.log(user_data);

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: { user, token: newToken } });

      // Toast notification for success
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      // Check user type and navigate accordingly
      if (user.user_type === "admin") {
        navigate("/admin-dashboard");
      } else if (user.user_type === "user") {
        navigate("/user-dashboard");
      }

      //   // Navigate based on user_type
      //   if (user.user_type === "admin") {
      //     navigate("/dashboard", { state: { userName: user.user_name } });
      //   } else {
      //     navigate("/profile", { state: { userName: user.user_name } });
      //   }

      // Clear input fields
      setInputData({ email: "", user_password: "" });
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <div className="main h-screen w-full flex ">
      {/* Left Section */}

      <div className="w-1/2 h-full relative">
        <form
          onSubmit={handleLogin}
          className="h-2/3 flex justify-end items-center flex-col gap-5 pb-10"
        >
          {/* <div className="h-2/3 flex justify-end items-center flex-col gap-5 pb-10"> */}
            <div>
              <h1 className="text-4xl font-semibold pb-3">Welcome Back!</h1>
              <h3 className="font-semibold">
                You can log in to access with your account!!!
              </h3>
            </div>

            {/* Email Input */}

            <div className="border-black border-2 rounded-md w-2/5 p-1 flex items-center">
              <img className="px-3" src="./LeftColumn/Email.png" alt="Email Icon" />
              <input
                className="border-none outline-none w-full"
                type="email"
                placeholder="Your Email"
                name="email"
                value={inputData.email}
                onChange={handleData}
                required
              />
            </div>

            {/* Password Input */}
            <div className="border-black border-2 rounded-md w-2/5 p-1 flex items-center">
              <img className="px-3" src="./LeftColumn/Password.png" alt="Password Icon" />
              <input
                className="border-none outline-none w-full"
                type="password"
                placeholder="Password"
                name="user_password"
                value={inputData.user_password}
                onChange={handleData}
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="border-black border-2 rounded-md w-2/5 p-1 text-white bg-black hover:bg-yellow-600"
            >
              Login
            </button>
          {/* </div> */}
        </form>
        <img
          className="w-full absolute bottom-10 p-2"
          src="./LeftColumn/P1_bg.png"
          alt="Background"
        />
      </div>

      {/* Right Section */}
      <div
        className="w-1/2 h-full text-3xl text-gray-600 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: "url('./LeftColumn/P2_bg.png')",
        }}
      >
        <div className="text-center pt-20 ">
          <div>The future belongs to those who</div>
          <div>
            <span className="text-blue-800">believe</span> in the
            <span className="text-blue-800">beauty of their dreams</span>
          </div>
          <div className="author text-lg text-right pr-32">
            - Eleanor Roosevelt
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
