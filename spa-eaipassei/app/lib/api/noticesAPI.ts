'use client';

import Axios from "axios";
import { NoticeFormRequest } from "../types/noticeTypes";

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

export const createNotice = async (url: string, notice: NoticeFormRequest) => {
  try {
    const resp = await axios.post(url, notice);
    if (resp.status >= 200 && resp.status < 300) {
      console.log('RESPOSTA DE SUCESSO', resp);
      return resp;
    } else {
      console.log('Resposta nao identificada.');
    }
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      console.log('Erro ao criar o edital', error.message);
    }
  }
}

export const deleteNotices = async (url: string, data: number[]) => {
  try {
    const resp = await axios.delete(url, { data: { ids: data }, headers: { 'Content-Type': 'application/json' }});
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else {
      console.log('Resposta nao identificada.');
    }
  } catch (error: any) {
    if (error.response && error instanceof Error) {
      console.log('Erro ao deletar o edital', error.message);
      console.error(error);
    }
  }
}