import Axios from "axios";
import { UserUpdateRequest } from "../types/userTypes";

const axios = Axios.create({
	withCredentials: true,
	headers: {
    "Content-Type": "multipart/form-data",
		"Accept": "application/json",
	},
});

export const updateUser = async (url: string, userUpdateRequest: UserUpdateRequest) => {
  try {
    const formData = new FormData();
    Object.keys(userUpdateRequest).forEach(key => {
      const value = userUpdateRequest[key];
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });

    const resp = await axios.put(url, formData, {
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
    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
      console.log('Erro ao atualizar o usuário', error);
      console.log('Erro ao atualizar o usuário', error.message);
    }
  }
}