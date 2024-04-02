'use client';

import Link from 'next/link';
import { FaBook } from 'react-icons/fa';

const NoticesLink = () => {
  return (
    <Link href="/admin/manage/notices" className="nav-link">
      <li className="nav-item">
        <FaBook />
        Editais
      </li>
    </Link>
  )
}

export default NoticesLink;