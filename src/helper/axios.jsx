import axios from "axios";

// Set the baseURL dynamically using an environment variable or a default value
const ApiAxios= axios.create({
  baseURL: "https://fae2-2405-201-37-21d9-7042-bfc5-ac0-6d3.ngrok-free.app/", // Use environment variable if available
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

export default ApiAxios;
