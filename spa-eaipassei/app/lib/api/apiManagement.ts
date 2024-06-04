'use client';

import Axios from "axios";
import { AxiosResponse } from "axios";

const axios = Axios.create({
	withCredentials: true,
	headers: {
    "Content-Type": "multipart/form-data",
		"Accept": "application/json",
	},
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
  );

async function fetchData<T>(url: string, params: Record<string, any> = {}): Promise<T | null> {
  try {
    const resp: AxiosResponse<T> = await axios.get(url, { params });
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
    return null;
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log(`Erro ao buscar os dados de ${url}`, error);
    }
    return error;
  }
}

export {
  fetchData,
}