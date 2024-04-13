'use client';

import Axios from "axios";

const axios = Axios.create({
	withCredentials: true,
	headers: {
    "Content-Type": "multipart/form-data",
		"Accept": "application/json",
	},
});

export const getAllNotices = async (url: string, params: any) => {
  try {
    const resp = await axios.get(url, { params });
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log('Erro ao buscar os editais', error);
    }
  }
}

export const createNotice = async (url: string, data: any) => {
  try {
    const resp = await axios.post(url, data);
    if (resp.status >= 200 && resp.status < 300) {
      console.log('RESPOSTA DE SUCESSO', resp.data);
      return resp.data;
    } else {
      console.log('NAO DEU');
    }
      console.log('RESPOSTA...');
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log('Erro ao criar o edital', error.message);
    }
  }
}