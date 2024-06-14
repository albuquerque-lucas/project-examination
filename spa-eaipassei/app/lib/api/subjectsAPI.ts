'use client';

import Axios, { AxiosResponse } from "axios";
import HttpError from "../utils/Class/HttpError";
import { SubjectsFormRequest } from "../types/subjectTypes";

const axios = Axios.create({
	withCredentials: true,
	headers: {
    "Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export const getAllSubjects = async (url: string, params: any) => {
  try {
    // console.log('URL de getAllSubjects', url);
    // console.log('Params de getAllSubjects', params);
    const resp = await axios.get(url, params);
    if (resp.status >= 200 && resp.status < 300) {
      // console.log('Resposta de sucesso de getAllSubjects', resp.data);
      return resp.data;
    }
    return null;
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log('Erro ao buscar as disciplinas', error);
    }
    return null;
  }
}

export const deleteSubjects = async (url: string, data: any) => {
  try {
    const resp = await axios.delete(url, { data });
    console.log('Resposta de deleteSubjects', resp);
    console.log('Data de deleteSubjects', resp.data);
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log('Erro ao deletar a disciplina', error);
    }
  }
}

export const createSubject = async (url: string, subject: SubjectsFormRequest) => {
  try {
    const resp = await axios.post(url, subject);
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else {
      console.log('Resposta nao identificada.');
    }
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      if (error.response.status === 409) {
        throw new HttpError('Este registro ja existe no banco de dados', 409);
      }
      throw new HttpError(error.response.data.message, error.response.status);
    }
  }
}
