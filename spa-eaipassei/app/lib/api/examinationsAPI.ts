import axios from "../axios/axios";

export const getAllExaminations = async () => {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_GET_EXAMINATIONS_LIST}`);
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log('Erro ao buscar os concursos', error);
    }
  }
}