'use client';

import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserUpdateRequest } from "../types/userTypes";
import { update, updateImage } from "../api/userAPI";
import { ProfileImageFormRequest } from "../types/userTypes";

export default function useUpdateUser() {
  const { user, setUser, updateMessage, setUpdateMessage } = useContext(AuthContext);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  
  const updateUser = async (event: React.FormEvent, userId: string | null, ref: any, field: string) => {
    event.preventDefault();
    if (!userId) {
      setUpdateMessage({
        message: 'O ID do usuário é obrigatório.',
        type: 'error',
        });
      return;
    }
    const id = Number(userId);

    if (ref.current.value.trim() === '') {
      setUpdateMessage({
        message: 'O campo não pode ser vazio.',
        type: 'error',
        });
      return;
    }

    const userUpdateRequest: UserUpdateRequest = {
      id: Number(userId),
      [field]: ref.current.value,
    };

    try {
      const response = await update(`${process.env.NEXT_PUBLIC_API_UPDATE_PROFILE}/${id}`, userUpdateRequest);

      if (response?.status === 200) {
        setUpdateMessage({
          message: response.data.message,
          type: 'success',
        });
        if (response.data.user) {
          setUser(response.data.user);
        }
      }
    } catch (error: any) {
      console.error('Erro ao atualizar o usuário', error);
      if(error.status >= 400 && error.status < 500) {
        console.log(error.data.message);
        setUpdateMessage({
          message: error.data.message,
          type: 'error',
        });
      }
    }
  }

  const updateUserImage = async (event: React.FormEvent, userId: string | null, ref: any, field: string) => {
    event.preventDefault();
    const id = Number(userId);
    if (!userId) {
      console.log('O ID do usuário é obrigatório.');
      return;
    }
  
    const fileRef = ref.current?.files?.length
      && ref.current.files[0] instanceof File
      ?
      ref.current.files[0]
      :
      null;
      ;
  
      if (!fileRef) {
        setUpdateMessage({
          message: 'Selecione um arquivo de imagem.',
          type: 'error',
        });
        return;
      }
      const fileRequest: ProfileImageFormRequest = {
        profile_img: fileRef,
      };
  
    try {
      const response = await updateImage(`${process.env.NEXT_PUBLIC_API_UPDATE_PROFILE}/${id}`, fileRequest);
      console.log('Resposta', response);
      if (response?.status === 200) {
        if (response.data.user) {
          setUser(response.data.user);
          setUpdateMessage({
            message: response.data.message,
            type: 'success',
          });
        }
      }
    } catch (error: any) {
      console.log('Erro ao atualizar o usuário', error);
      if(error.status >= 400 && error.status < 500) {
        console.log(error.message);
        setUpdateMessage({
          message: error.message,
          type: 'error',
        });
      }
    }
  }

  return {
    updateUser,
    updateUserImage,
    setUpdateMessage,
    firstNameRef,
    lastNameRef,
    emailRef,
    phoneNumberRef,
    usernameRef,
    imageRef,
    updateMessage,
  }
}