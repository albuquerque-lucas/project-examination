'use client';

import { useState, useContext, useEffect, useRef } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from "../context/AuthContext";
import { UserUpdateRequest } from "../types/userTypes";
import { update } from "../api/userAPI";

export default function useUpdateUser() {
  const { user, setUser } = useContext(AuthContext);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  
  const updateUser = async (userId: string | null, ref: any, field: string) => {
    if (!userId) {
      console.log('O ID do usuário é obrigatório.');
      return;
    }
    const id = Number(userId);

    if (ref.current.value.trim() === '') {
      console.log('Campo vazio ou apenas com espaços em branco não é permitido.');
      return;
    }

    const userUpdateRequest: UserUpdateRequest = {
      id: Number(userId),
      [field]: ref.current.value,
    };
    const formData = new FormData();
    Object.entries(userUpdateRequest).forEach(([key, value]) => {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await update(`${process.env.NEXT_PUBLIC_API_UPDATE_PROFILE}/${id}`, userUpdateRequest);

      if (response?.status === 200) {
        console.log('Atualização realizada com sucesso', response);
        setUser(response.data.user);
      }
    } catch (error: any) {
      console.log('Erro ao atualizar o usuário', error);
    }
  }

  return {
    updateUser,
    firstNameRef,
    lastNameRef,
    emailRef,
    phoneNumberRef,
    usernameRef,
    imageRef,
  }
}