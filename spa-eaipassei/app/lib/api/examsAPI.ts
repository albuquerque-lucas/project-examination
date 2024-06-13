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
    return error;
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

export const deleteExam = async (url: string): Promise<boolean | null> => {
  try {
    const response: AxiosResponse = await axios.delete(url);
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    
    throw new Error('Erro ao deletar o exame');
  } catch (error: any) {
    console.log('Ocorreu um erro ao deletar a prova', error);
    return null;
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
    return null;
  }
}

export const updateExam = async (data: ExamUpdateRequest) => {
  try {
    const resp = await axios.patch(`${process.env.NEXT_PUBLIC_API_UPDATE_EXAM}/${data.id}`, data);
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
    console.log('Resultado inesperado ao atualizar o exame', resp);
  } catch (error: any) {
    if (error.response >= 400 && error.response.status < 500) {
      console.log('Erro ao atualizar o exame', error);
    }
  }

  }

  export const updateQuestion = async (data: ExamQuestion) => {
    try {
      const resp = await axios.patch(`${process.env.NEXT_PUBLIC_API_UPDATE_QUESTION}/${data.id}`, data);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
      console.log('Resultado inesperado ao atualizar as questoes', resp);
      return null;
    } catch (error: any) {
      if (error.response >= 400 && error.response.status < 500) {
        console.log('Erro ao atualizar as questoes', error);
        return null;
      }
    }
  }

  export const deleteQuestion = async (id: string | number) => {
    try {
      const resp = await axios.delete(`${process.env.NEXT_PUBLIC_API_DELETE_QUESTION}/${id}`);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
    } catch (error: any) {
      if (error.response >= 400 && error.response.status < 500) {
        console.log('Erro ao deletar as questoes', error);
      }
    }
  }

  export const updateAlternative = async (data: Record<string, any>) => {
    try {
      const resp = await axios.patch(`${process.env.NEXT_PUBLIC_API_UPDATE_ALTERNATIVE}/${data.id}`, data);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
    } catch (error: any) {
      if (error.response >= 400 && error.response.status < 500) {
        console.log('Erro atualizar a alternativa', error);
      }
    }
  }

  export const createAlternative = async (data: Record<string, any>) => {
    try {
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_CREATE_ALTERNATIVE}`, data);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
      console.log('Erro ao criar a alternativa', resp);
      return null;
    } catch (error: any) {
      if (error.response >= 400 && error.response.status < 500) {
        console.log('Erro ao criar a alternativa', error);
      }
      return null;
    }
  }

  export const deleteAlternative = async (id: string | number) => {
    try {
      const resp = await axios.delete(`${process.env.NEXT_PUBLIC_API_DELETE_ALTERNATIVE}/${id}`);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
      console.log('Erro ao deletar a alternativa', resp);
      return null;
    } catch (error: any) {
      if (error.response >= 400 && error.response.status < 500) {
        console.log('Erro ao buscar os concursos', error);
      }
      return null;
    }
  }

  export const updateDetachSubject = async (exam_id: string | number, subject_id: string | number) => {
    try {
      const resp = await axios.delete(`${process.env.NEXT_PUBLIC_DETACH_SUBJECT_EXAM}/${exam_id}-${subject_id}`);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
    } catch (error: any) {
      if (error.response >= 400 && error.response.status < 500) {
        console.log('Erro ao buscar os concursos', error);
      }
    }

    }


  export const organizeQuestions = async (examId: number) => {
    try {
      console.log('Organizar questões');
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_ORGANIZE_QUESTIONS}/${examId}`);
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
      return null;
    } catch(error: any) {
      console.log('Erro ao organizar as questões', error);
    }
  }