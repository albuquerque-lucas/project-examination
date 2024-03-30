'use-client';

import { useLayoutEffect, useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { fetchUser } from "../../axios/axios";
import { AuthContext } from "../../context/AuthContext";

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const router = useRouter();
    const { user, setUser } = useContext(AuthContext);

    useLayoutEffect(() => {
      async function fetchData() {
        if (!user) {
          try {
            const currentUser = await fetchUser();
            console.log('USER', currentUser);
            if (!currentUser || currentUser === undefined || currentUser === null) {
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
          setIsAuthChecked(true);
        
        }
      }
      fetchData();
    }, []);

    if (!isAuthChecked) {
      return null; // ou um componente de carregamento
    }

    return <Component {...props} />;
  }
}