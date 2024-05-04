'use client';

import { useState, useContext, useEffect, useRef } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from "../context/AuthContext";
import { UserUpdateRequest } from "../types/userTypes";
import { updateUser } from "../api/userAPI";

export default function useUpdateUser() {
  const { user, setUser } = useContext(AuthContext);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  
  const updateUser = async (userId: string | null, ref: any) => {
    if (!userId) {
      console.log('O ID do usuário é obrigatório.');
      return;
    }
    const id = Number(userId);

    if (ref.current.value.trim() === '') {
      console.log('Campo vazio ou apenas com espaços em branco não é permitido.');
      return;
    }
      try {
        const response = await updateUser(`${process.env.NEXT_PUBLIC_API_UPDATE_PROFILE}/${id}`, {
          first_name: firstNameRef.current?.value,
          last_name: lastNameRef.current?.value,
          email: emailRef.current?.value,
          phone_number: phoneNumberRef.current?.value,
          username: usernameRef.current?.value,
          image: imageRef.current?.value,
        });
      } catch (error: any) {
        console.log('Erro ao atualizar o usuário', error);
      }

    // for (const field of fields) {
    //   if (field.current && typeof field.current.value === 'string' && field.current.value.trim() === '') {
    //     console.log('Campo vazio ou apenas com espaços em branco não é permitido.');
    //     return;
    //   }
    // }
  
    // Continue com a lógica de atualização aqui...
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