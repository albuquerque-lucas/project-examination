import Axios from "axios";
import { UserUpdateRequest } from "../types/userTypes";

const axios = Axios.create({
	withCredentials: true,
	headers: {
    "Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export const update = async (url: string, userUpdateRequest: UserUpdateRequest) => {
  try {
    console.log('userUpdateRequest', userUpdateRequest);
    console.log('url informada', url);

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