import axios from "../axios/axios";

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

export const makeLogout = async () => {
	try {
		const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_LOGOUT_ENDPOINT}`);
		if (resp.status === 200) {
			localStorage.removeItem('user');
			console.log('Logout efetuado com suceddo.');
			console.log(resp);
		}
	} catch (error) {
		console.log('Nao foi possivel fazer logout.');
		console.log(error);
	}
}

export const fetchUser = async () => {
	try {
		const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_GET_AUTH_USER}`);
		if (resp.status >= 200 && resp.status < 300) {
			return resp.data;
		}
	} catch (error: any) {
		if (error.response && error.response.status === 401) {
			console.log('AuthError', error);
			localStorage.removeItem('user');
		}
	}
};