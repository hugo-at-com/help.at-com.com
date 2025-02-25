// api.js
import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		Authorization: token ? `Bearer ${token}` : "",
	},
});

export default api;
