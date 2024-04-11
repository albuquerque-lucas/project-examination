import { useEffect } from "react";
import { AuthMessage } from "@/app/lib/types/messageTypes";
import { MdError } from "react-icons/md";
import style from '@/app/ui/admin/login/messages.module.css';


export default function MessageBox({ message, type, setMessage }: AuthMessage) {

  useEffect(() => {
    const timer = setTimeout(() => {
    if (setMessage) {
      setMessage(null);
    }
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