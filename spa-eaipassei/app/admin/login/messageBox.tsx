import { useEffect } from "react";
import { AuthMessage, UpdateUserMessage } from "@/app/lib/types/messageTypes";
import { MdError } from "react-icons/md";
import style from '@/app/ui/admin/login/messages.module.css';


export default function MessageBox({ message, type, setMessage }: AuthMessage | UpdateUserMessage) {

  useEffect(() => {
    const timer = setTimeout(() => {
    if (setMessage) {
      setMessage(null);
    }
  }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const messageType: { [key: string]: string } = {
    success: style.success,
    error: style.error,
    warning: style.warning,
  };
  return (
    <div className={`${style.login_message__span} ${messageType[type || 'warning']}`}>
      <MdError />
      <p>
        { message }
      </p>
    </div>
  )
}