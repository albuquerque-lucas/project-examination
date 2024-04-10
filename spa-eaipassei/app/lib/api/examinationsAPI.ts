import Axios from "axios";
import { Examination } from "../types/examinationTypes";

export const axios = Axios.create({
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export const getAllExaminations = async (params: Record<string, any> = {}) => {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_GET_EXAMINATIONS_LIST}`);
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    }
  } catch (error: any) {
    if (error.response >= 400 && error.response.status < 500) {
      console.log('Erro ao buscar os concursos', error);
    }
  }

}

export const getExaminationsByPage = async (url: string, params: Record<string, any> = {}) => {
  try {
    const resp = await axios.get(url, { params });
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log('Erro ao buscar os concursos', error);
    }
  }
}
  export const getExaminationById = async (id: string) => {
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_GET_EXAMINATION_BY_ID}${id}`);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
    } catch (error: any) {
      if (error.response >= 400 && error.response.status < 500) {
        console.log('Erro ao buscar os concursos', error);
      }
    }
  }

  export const createMany = async(data: Examination[]) => {
    try {
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_CREATE_MANY}`, data);
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }
    } catch (error: any) {
      if (error.response >= 400 && error.response.status < 500) {
        console.log('Erro ao buscar os concursos', error);
      }
    }

  }

  export const deleteExamination = async (id: number) => {
    try {
      const resp = await axios.delete(`${process.env.NEXT_PUBLIC_API_DELETE_EXAMINATION}${id}`);
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }
    } catch (error: any) {
      if (error.response >= 400 && error.response.status < 500) {
        console.log('Erro ao buscar os concursos', error);
      }
    }
  }