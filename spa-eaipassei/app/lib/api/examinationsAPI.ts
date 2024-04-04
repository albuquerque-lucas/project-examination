import Axios from "axios";

export const axios = Axios.create({
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
})

export const getAllExaminations = async () => {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_GET_EXAMINATIONS_LIST}`);
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
  } catch (error: any) {
    if (error.response >= 400 && error.response.status < 500) {
      console.log('Erro ao buscar os concursos', error);
    }
  }

}

export const getExaminationsByPage = async (url: string) => {
  try {
    const resp = await axios.get(url);
    console.log('Response:', resp);
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