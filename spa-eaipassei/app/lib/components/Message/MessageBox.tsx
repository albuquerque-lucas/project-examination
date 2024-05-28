import { useEffect } from "react";
import { FlashMessage } from "@/app/lib/types/messageTypes";
import { MdError } from "react-icons/md";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/login/messages.module.css';


export default function MessageBox({ message, type, setMessage }: FlashMessage) {

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
    dark: style.dark,
  };
  return (
      <motion.div
        className={`${style.login_message__span} ${messageType[type || 'warning']}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
        <MdError />
        <p>
          { message }
        </p>
      </motion.div>
  )
}