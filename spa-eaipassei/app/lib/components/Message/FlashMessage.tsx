'use client';
import { useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import style from '@/app/ui/admin/message/flashMessage.module.css';

type CreationMessage = {
  message: string;
  setMessage?: (message: string | null) => void;

}

export default function FlashMessage({ message, setMessage }: CreationMessage) {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (setMessage) {
        setMessage(null);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
      <motion.div
        className={ style.creation_messagebox }
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p>
          { message }
        </p>
      </motion.div>
  )
}