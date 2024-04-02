'use client';

import Link from 'next/link';
import { FaUsers } from "react-icons/fa6";

const SubjectsLink = () => {
  return (
    <Link href="/admin/manage/users">
      <li className="nav-item">
        <FaUsers />
        Usuários
      </li>
    </Link>
  )
}

export default SubjectsLink;