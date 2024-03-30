import style from '@/app/ui/admin/login/messages.module.css';
import { MdError } from "react-icons/md";

type MessageBoxProps = {
  message: string;
  type: 'success' | 'error' | 'warning' | string;
}

export default function MessageBox({ message, type }: MessageBoxProps) {
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