import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/Authentication/AuthContext";
import axios from '../axios';

export default function useAuthValidation() {
  const {
    setUser,
    authenticated,
    setAuthenticated
  } = useContext(AuthContext);
  useEffect(() => {
    console.log('Authenticated1111111', authenticated);
    (async () => {
      try {
        const resp = await axios.get('/admin/user');
        if (resp.status === 200) {
          console.log('Deu bom');
          console.log('User', resp.data);
          setUser(resp.data);
          setAuthenticated(true);
          console.log('Authenticated2222', authenticated);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('AuthError', error);
          console.log('Nao deu bom');
          localStorage.removeItem('user');
        }
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuthenticated, authenticated]);
  return [authenticated];
}