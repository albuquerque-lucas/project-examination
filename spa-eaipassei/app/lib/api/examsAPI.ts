import { fetchData } from "./apiManagement";
import { PaginatedAPIResponse } from "../types/entityContextTypes";
import { Exam, ExamQuestion } from "../types/examTypes";
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
    return null;
  } catch (error: any) {
    console.log('Erro ao criar o exame', error);
    return null;
  }
}