import axios from "axios";

// Set the baseURL dynamically using an environment variable or a default value
const ApiAxios= axios.create({
  baseURL: "https://e5b4-2405-201-37-21d9-c1e-e524-5696-4607.ngrok-free.app/", // Use environment variable if available
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

export default ApiAxios;
