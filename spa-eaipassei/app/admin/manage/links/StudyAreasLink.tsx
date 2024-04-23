'use client';

import withAuth from '@/app/lib/components/withAuth/withAuth';
import Link from 'next/link';
import NavbarItem from '@/app/lib/components/ListItems/navbarItem';
import { IoIosSchool } from "react-icons/io";

const StudyAreasLink = () => {
  return (
    <Link href="/admin/manage/study-areas" className="nav-link">
      <NavbarItem>
        <IoIosSchool />
          Áreas de Estudo
      </NavbarItem>
    </Link>
  )
}

export default StudyAreasLink;