import Axios from "axios";

type loginBodyRequest = {
	username: string | undefined;
	password: string | undefined;
	callbackUrl: string | undefined;
	redirect: boolean;

}

interface FetchUserResponse {
  user: any | null; // Replace 'any' with the actual user type
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
	error_message?: string;
}

const axios = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});

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
			return resp;
		}
	} catch (error) {
		console.log('Nao foi possivel fazer logout.');
		console.log(error);
	}
}

export const fetchUser = async (): Promise<FetchUserResponse> => {
	try {
		const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_GET_AUTH_USER}`);
		if (resp.status === 200) {
			return {
				user: resp.data,
				message: 'O usuario esta logado.',
				type: 'success',
			};
		}
		if (resp.status > 200 && resp.status < 400) {
			throw new Error(`Parece que o que voce esta tentando fazer resultou em um comportamento inesperado. Status: ${resp.status}`);
		}
	} catch (error: any) {
		if (error.response && error.response.status === 401) {
			console.log('AuthError', error);
			localStorage.removeItem('user');
			return {
				user: null,
				message: 'É necessário fazer login.',
				type: 'warning',
			}
		}
		return {
			user: null,
			message: 'Erro ao tentar realizar o login.',
			type: 'error',
			error_message: error.response.data.message,
		}
	}
	return {
		user: null,
		message: 'Erro desconhecido.',
		type: 'error',
}
};