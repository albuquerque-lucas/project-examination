'use client';

import withAuth from '@/app/lib/components/withAuth/withAuth';
import Link from 'next/link';
import { IoIosSchool } from "react-icons/io";

const SubjectsLink = () => {
  return (
    <Link href="/admin/manage/subjects" className="nav-link">
      <li className="nav-item">
        <IoIosSchool />
          Matérias
      </li>
    </Link>
  )
}

export default SubjectsLink;