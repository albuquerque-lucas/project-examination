 import Axios from "axios";
import { UserUpdateRequest, ProfileImageFormRequest } from "../types/userTypes";
import { Profile } from "next-auth";
import HttpError from "../utils/Class/HttpError";

const axios = Axios.create({
	withCredentials: true,
	headers: {
    "Content-Type": "application/json",
		"Accept": "application/json",
	},
});

const axiosWithImage = Axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
  },
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
  );

export const update = async (url: string, userUpdateRequest: UserUpdateRequest) => {
  try {

    const resp = await axios.patch(url, userUpdateRequest);

    if (resp.status >= 200 && resp.status < 300) {
      console.log('RESPOSTA DE SUCESSO de updateUser', resp);
      return resp;
    } else {
      console.log('Resposta nao identificada de updateUser.');
    }
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      console.log('Erro ao atualizar o usuário', error);
      console.log('Erro ao atualizar o usuário', error.message);
    }
  }

}

export const updateImage = async (url: string, profileImg: ProfileImageFormRequest) => {
  try {
    console.log('profileImg', profileImg);
    console.log('url informada', url);

    const formData = new FormData();
    formData.append('profile_img', profileImg.profile_img);
    formData.append('_method', 'PATCH');

    for (let pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
      console.log('teste')
  }

    const resp = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    
    });

    if (resp.status >= 200 && resp.status < 300) {
      console.log('RESPOSTA DE SUCESSO de updateUser', resp);
      return resp;
    } else {
      console.log('Resposta nao identificada de updateUser.');
    }
  } catch (error: any) {
    if (error.response && error.response.status >= 400 && error.response.status < 500) {
      console.log('Erro ao atualizar o usuário', error);
      console.log(error.response.data.message);
      throw new HttpError(error.response.data.message, error.response.status);
    }

    if (error.response.status >= 500) {
      console.log('Erro ao atualizar o usuário', error);
      console.log('Erro ao atualizar o usuário', error.message);
      throw new HttpError('Erro interno no servidor', error.response.status);
    }
  }
}