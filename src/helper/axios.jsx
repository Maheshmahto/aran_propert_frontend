import axios from "axios";

// Set the baseURL dynamically using an environment variable or a default value
const ApiAxios= axios.create({
  baseURL: "https://7d54-2405-201-37-21d9-614e-febb-754e-5558.ngrok-free.app/", 
  // baseURL: "http://127.0.0.1:8000", // Use environment variable if available
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

export default ApiAxios;
