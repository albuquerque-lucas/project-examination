'use client';

import withAuth from '@/app/lib/components/withAuth/withAuth';
import Link from 'next/link';
import { FaUsers } from "react-icons/fa6";

const UsersLink = () => {
  return (
    <Link href="/admin/manage/users">
      <li className="nav-item">
        <FaUsers />
        Usuários
      </li>
    </Link>
  )
}

export default withAuth(UsersLink);