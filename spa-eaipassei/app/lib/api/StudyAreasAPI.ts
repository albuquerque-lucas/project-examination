import Axios from "axios";
import { StudyAreasFormRequest } from "../types/studyAreasTypes";
import HttpError from "../utils/Class/HttpError";

const axios = Axios.create({
	withCredentials: true,
	headers: {
    "Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export const getAllAreas = async (url: string, params: any) => {
  try {
    const resp = await axios.get(url, { params });
    if (resp.status >= 200 && resp.status < 300) {
      return resp.data;
    }
    return null;
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log('Erro ao buscar as areas', error);
    }
    return null;
  }
}

export const createStudyArea = async (url: string, studyArea: StudyAreasFormRequest) => {
  try {
    const resp = await axios.post(url, studyArea);
    console.log('Resposta de createStudyArea', resp);
    if (resp.status >= 200 && resp.status < 300) {
      console.log('DATA RESULT CREATE STUDY AREA', resp);
      return resp;
    } else {
      console.log('Resposta nao identificada.');
    }
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log('Erro ao criar a area', error);
      throw new HttpError(error.response.data.message, error.response.status);
    }
  }
}

export const deleteAreas = async (url: string, data: any) => {
  try {
    const resp = await axios.delete(url, { data });
    if (resp.status >= 200 && resp.status < 300) {
      console.log('DATA RESULT DELETE STUDY AREA', resp);
      return resp.data;
    }
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log('Erro ao deletar a area', error);
    }
  }
}