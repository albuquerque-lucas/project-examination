import Axios from "axios";

const axios = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});


type loginBodyRequest = {
	username: string | undefined;
	password: string | undefined;
	callbackUrl: string | undefined;
	redirect: boolean;

}

export const makeLogin = async (body: loginBodyRequest) => {
	try {
		await axios.get(`${process.env.NEXT_PUBLIC_SANCTUM_CSRF_COOKIE_URL}`);
		const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_LOGIN_ENDPOINT}`, body);
		if (resp.status >= 200 && resp.status < 300) {
				console.log('Sucesso!!!', resp.data);
				return resp.data;
		} else {
				throw new Error(`Request failed with status code ${resp.status}`);
		}
	} catch (error: any) {
			console.error('Error: ', error.response?.data);
			throw error;
	}
}

export default axios;