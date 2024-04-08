import { useEffect, useContext } from "react";
import { AuthContext } from "@/app/lib/context/AuthContext";
import { AuthMessage } from "@/app/lib/types/messageTypes";
import { MdError } from "react-icons/md";
import style from '@/app/ui/admin/login/messages.module.css';


export default function MessageBox({ message, type }: AuthMessage) {
  const { setAuthMessage } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthMessage(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const messageType: { [key: string]: string } = {
    success: style.success,
    error: style.error,
    warning: style.warning,
  };
  return (
    <div className={`${style.login_message__span} ${messageType[type]}`}>
      <MdError />
      <p>
        { message }
      </p>
    </div>
  )
}