'use client';

import Link from 'next/link';
import NavbarItem from '@/app/lib/components/ListItems/navbarItem';
import { FaBook } from 'react-icons/fa';

const NoticesLink = () => {
  return (
    <Link href="/admin/manage/notices" className="nav-link">
      <NavbarItem>
        <FaBook />
        Editais
      </NavbarItem>
    </Link>
  )
}

export default NoticesLink;