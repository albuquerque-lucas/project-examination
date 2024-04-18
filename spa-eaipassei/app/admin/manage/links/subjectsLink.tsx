'use client';

import withAuth from '@/app/lib/components/withAuth/withAuth';
import Link from 'next/link';
import NavbarItem from '@/app/lib/components/ListItems/navbarItem';
import { IoIosSchool } from "react-icons/io";

const SubjectsLink = () => {
  return (
    <Link href="/admin/manage/subjects" className="nav-link">
      <NavbarItem>
        <IoIosSchool />
          Matérias
      </NavbarItem>
    </Link>
  )
}

export default SubjectsLink;