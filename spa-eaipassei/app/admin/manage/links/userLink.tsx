'use client';

import withAuth from '@/app/lib/components/withAuth/withAuth';
import Link from 'next/link';
import NavbarItem from '@/app/lib/components/ListItems/navbarItem';
import { FaUsers } from "react-icons/fa6";

const UsersLink = () => {
  return (
    <Link href="/admin/manage/users">
      <NavbarItem>
        <FaUsers />
        Usuários
      </NavbarItem>
    </Link>
  )
}

export default withAuth(UsersLink);