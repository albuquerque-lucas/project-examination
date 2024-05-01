'use client';

import { useState, useContext, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { fetchUser } from "@/app/lib/api/authenticationAPI";
import { AuthContext } from "../../context/AuthContext";
import { makeLogout } from "../../axios/axios";

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const { user, setUser, setAuthMessage } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
      setAuthMessage(null);
      async function fetchData() {
        if (!user) {
          try {
            const response = await fetchUser();
            console.log('USER', response);
            if (pathname !== '/admin/login' || response.type === 'error') {
              console.log('RESPOSTA DE USUARIO NOT FOUND', response);
              setAuthMessage(
                {
                  message: response.message,
                  type: response.type,
                }
              );
              setUser(null);
              router.push('/admin/login');
            } else {

              setIsAuthChecked(true);
              setUser(response.user);
            }
          } catch (error: any) {
            console.error('Error: ', error);
            console.log('Error: ', error.response?.data);
            setUser(null);
            router.push('/admin/login');
          }
        } else {
          if (user && user.account_plan !== 'Admin') {
            setAuthMessage(
              {
                message: 'Você não tem permissão para acessar essa página.',
                type: 'error',
              }
            );
            makeLogout();
            setUser(null);
            router.push('/admin/login');
          }
          // console.log('User already logged in', user);
          setIsAuthChecked(true);
          
        }
      }
      fetchData();
    }, [user]);

    if (!isAuthChecked) {
      return null;
    }

    return <Component {...props} />;
  }
}