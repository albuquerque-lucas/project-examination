'use client';

import Axios from "axios";
import { NoticeFormRequest } from "../types/noticeTypes";
import HttpError from "../utils/Class/HttpError";

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
    return null;
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log('Erro ao buscar os editais', error);
    }
    return null;
  }
}

export const createNotice = async (url: string, notice: NoticeFormRequest) => {
  try {
    const resp = await axios.post(url, notice, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    
    });
    if (resp.status >= 200 && resp.status < 300) {
      console.log('RESPOSTA DE SUCESSO', resp);
      return resp;
    } else {
      console.log('Resposta nao identificada.');
    }
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      console.log('Erro ao criar o edital', error);
      console.log('Erro ao criar o edital', error.response.data.message);
      throw new HttpError(error.response.data.message, error.response.status);
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