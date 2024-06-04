import { fetchData } from "./apiManagement";
import { PaginatedAPIResponse } from "../types/entityContextTypes";
import { Exam, ExamQuestion, ExamUpdateRequest } from "../types/examTypes";
import Axios, { AxiosResponse } from "axios";

const axios = Axios.create({
	withCredentials: true,
	headers: {
    "Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export const getExams = async (url: string, params: Record<string, any> = {}): Promise<PaginatedAPIResponse<Exam> | null> => {
  return fetchData<PaginatedAPIResponse<Exam>>(url, params);
}

export const getExamById = async (url: string, params: Record<string, any> = {}): Promise<Exam | null> => {
  try {
    const response: AxiosResponse<Exam> = await axios.get(url, { params});
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return null;
  } catch (error: any) {
    console.log('Erro ao buscar o exame', error);
    return null;
  }
}

export const getQuestionsByExam = async (url: string, params: Record<string, any> = {}): Promise<PaginatedAPIResponse<ExamQuestion> | null> => {
  return fetchData<PaginatedAPIResponse<ExamQuestion>>(url, params);
}

export const createExam = async (url: string, data: Record<string, any>): Promise<Exam | null> => {
  try {
    const response: AxiosResponse<Exam> = await axios.post(url, data);
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error('Erro ao criar o exame');
  } catch (error: any) {
    throw new Error('Erro ao criar o exame', error);
  }
}

export const createQuestion = async (url: string, data: Record<string, any>): Promise<ExamQuestion | null> => {
  console.log('DATA', data);
  try {
    const response: AxiosResponse<ExamQuestion> = await axios.post(url, data);
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error('Erro ao criar a questão');
  } catch (error: any) {
    throw new Error('Erro ao criar', error.message);
  }
}

export const createQuestionAlternative = async (url: string, data: Record<string, any>): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.post(url, data);
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error('Erro ao criar a alternativa');
  } catch (error: any) {
    throw new Error('Erro ao criar a alternativa', error);
  }
}

export const deleteExam = async (url: string): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.delete(url);
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    
    throw new Error('Erro ao deletar o exame');
  } catch (error: any) {
    throw new Error('Erro ao deletar o exame', error);
  }
}

export const createExamFull = async (url: string, data: Record<string, any>): Promise<Exam | null> => {
  try {
    const response: AxiosResponse<Exam> = await axios.post(url, data);
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    throw new Error('Erro ao criar o exame');
  } catch (error: any) {
    throw new Error('Erro ao criar o exame', error);
  }
}

export const updateExam = async (data: ExamUpdateRequest) => {
  try {
    const resp = await axios.patch(`${process.env.NEXT_PUBLIC_API_UPDATE_EXAM}/${data.id}`, data);
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error: any) {
    if (error.response >= 400 && error.response.status < 500) {
      console.log('Erro ao buscar os concursos', error);
    }
  }
}