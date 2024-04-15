'use client';

import { BiLogOutCircle } from "react-icons/bi";
import NavbarItem from "@/app/lib/components/ListItems/navbarItem";
import style from '@/app/ui/admin/links/logoutLink.module.css';

interface LogoutLinkProps {
  logout: (e: React.SyntheticEvent) => Promise<void>;
}

const LogoutLink: React.FC<LogoutLinkProps> = ({ logout }) => {

  return (
    <NavbarItem>
    <BiLogOutCircle />
      <button
        className={ style.logout_btn }
        onClick={ logout }
        >
        Logout
      </button>
    </NavbarItem>
  )
}

export default LogoutLink;