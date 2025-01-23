import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URI || "http://localhost:4000", // Fallback to localhost
  headers: {
    "Content-Type": "application/json",
    Authorization: Boolean(localStorage.getItem("token")) ? `Token ${localStorage.getItem("token")}` : '',
  },
});

export default Axios;
