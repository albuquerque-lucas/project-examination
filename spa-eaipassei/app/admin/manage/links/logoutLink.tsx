'use client';

import { BiLogOutCircle } from "react-icons/bi";
import style from '@/app/ui/admin/links/logoutLink.module.css';

interface LogoutLinkProps {
  logout: (e: React.SyntheticEvent) => Promise<void>;
}

const LogoutLink: React.FC<LogoutLinkProps> = ({ logout }) => {

  return (
    <li className="nav-item">
    <BiLogOutCircle />
      <button
        className={ style.logout_btn }
        onClick={ logout }
        >
        Logout
      </button>
    </li>
  )
}

export default LogoutLink;