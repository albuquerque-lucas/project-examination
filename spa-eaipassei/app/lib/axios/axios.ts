import Axios from "axios";

const axios = Axios.create({
	baseURL: process.env.BASE_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export default axios;