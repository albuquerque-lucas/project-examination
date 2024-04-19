'use client';

import Axios from "axios";
import { SubjectsFormRequest } from "../types/subjectTypes";

const axios = Axios.create({
	withCredentials: true,
	headers: {
    "Content-Type": "multipart/form-data",
		"Accept": "application/json",
	},
});

export const getAllSubjects = async (url: string, params: any) => {
  try {
    const resp = await axios.get(url, { params });
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log('Erro ao buscar as disciplinas', error);
    }
  }
}
  export const deleteSubjects = async (url: string, data: any) => {
    try {
      const resp = await axios.delete(url, { data });
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
        console.log('Erro ao criar a disciplina', error);
        console.log('Erro ao criar a disciplina', error.message);
      }
    }
  }
