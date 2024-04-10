import Axios from "axios";
import { EducationalLevel } from "../types/examinationTypes";

export const axios = Axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export const educationalLevelsApi = {
  getAll: async (params: Record<string, any> = {}) => {
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_GET_EDUCATIONAL_LEVELS}`, { params });
      if (resp.status >= 200 && resp.status < 300) {
        return resp.data;
      }
    } catch (error: any) {
      if (error.response >= 400 && error.response.status < 500) {
        console.log('Erro ao buscar os níveis de escolaridade', error);
      }
    }
  }
}