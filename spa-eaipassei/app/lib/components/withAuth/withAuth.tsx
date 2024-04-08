'use-client';

import { useLayoutEffect, useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { fetchUser } from "../../axios/axios";
import { AuthContext } from "../../context/AuthContext";
import { makeLogout } from "../../axios/axios";

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const { user, setUser, setAuthMessage } = useContext(AuthContext);
    const router = useRouter();

    useLayoutEffect(() => {
      setAuthMessage(null);
      async function fetchData() {
        if (!user) {
          try {
            const currentUser = await fetchUser();
            // console.log('USER', currentUser);
            if (!currentUser || currentUser === undefined || currentUser === null) {
              setAuthMessage(
                {
                  message: 'Você precisa estar logado para acessar essa página.',
                  type: 'error',
                }
              );
              setUser(null);
              router.push('/admin/login');
            } else {

              setIsAuthChecked(true);
              setUser(currentUser);
            }
          } catch (error: any) {
            console.error('Error: ', error);
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
          console.log('User already logged in', user);
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